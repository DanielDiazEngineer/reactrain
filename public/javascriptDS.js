
//server log analysis
const serverLogs = `
2025-01-15T10:23:45Z server-01 ERROR Database connection failed
2025-01-15T10:24:12Z server-02 INFO Request processed successfully
2025-01-15T10:25:03Z server-01 ERROR Database connection failed
2025-01-15T10:26:45Z server-03 WARNING High memory usage detected
2025-01-15T10:27:30Z server-01 INFO Service restarted
2025-01-15T10:28:15Z server-02 ERROR Timeout occurred
`;

// Task: Parse logs and create summary by server and severity
const logSummary = serverLogs
  .trim()
  .split('\n')
  .reduce((acc, line) => {
    const [timestamp, server, level, ...message] = line.split(' ');

    if (!acc[server]) {
      acc[server] = { errors: 0, warnings: 0, info: 0, lastEvent: timestamp };
    }

    acc[server][level.toLowerCase() + 's']++;
    if (timestamp > acc[server].lastEvent) {
      acc[server].lastEvent = timestamp;
    }

    return acc;
  }, {});

console.log(logSummary);
// Expected Output:
// {
//   'server-01': { errors: 2, warnings: 0, info: 1, lastEvent: '2025-01-15T10:27:30Z' },
//   'server-02': { errors: 1, warnings: 0, info: 1, lastEvent: '2025-01-15T10:28:15Z' },
//   'server-03': { errors: 0, warnings: 1, info: 0, lastEvent: '2025-01-15T10:26:45Z' }
// }









//API REposne time tracking
const apiLogs = `
/api/users GET 45ms 200
/api/products GET 120ms 200
/api/users POST 89ms 201
/api/users GET 52ms 200
/api/products GET 450ms 500
/api/orders POST 234ms 201
/api/users GET 48ms 200
`;

// Task: Calculate avg response time and success rate per endpoint
const apiMetrics = apiLogs
  .trim()
  .split('\n')
  .reduce((acc, line) => {
    const [endpoint, method, time, status] = line.split(' ');
    const key = `${method} ${endpoint}`;
    const responseTime = parseInt(time);
    const isSuccess = status.startsWith('2');

    if (!acc[key]) {
      acc[key] = {
        totalTime: 0,
        requests: 0,
        successes: 0,
        failures: 0
      };
    }

    acc[key].totalTime += responseTime;
    acc[key].requests++;
    if (isSuccess) acc[key].successes++;
    else acc[key].failures++;

    return acc;
  }, {});

// Calculate averages and success rate
Object.keys(apiMetrics).forEach(endpoint => {
  const metric = apiMetrics[endpoint];
  metric.avgResponseTime = Math.round(metric.totalTime / metric.requests);
  metric.successRate = ((metric.successes / metric.requests) * 100).toFixed(1) + '%';
  delete metric.totalTime;
});

console.log(apiMetrics);





//Chat messagin giruping
const chatMessages = `
[2025-01-15 10:00] alice: Hello everyone!
[2025-01-15 10:01] bob: Hi Alice
[2025-01-15 10:02] alice: How's the project going?
[2025-01-15 10:05] charlie: Great progress today
[2025-01-15 10:06] alice: Excellent!
[2025-01-15 10:10] bob: Need help with testing
`;

// Task: Group consecutive messages by same user
const groupedMessages = chatMessages
  .trim()
  .split('\n')
  .reduce((acc, line) => {
    const match = line.match(/\[(.*?)\] (\w+): (.+)/);
    const [, time, user, message] = match;

    const lastGroup = acc[acc.length - 1];

    if (lastGroup && lastGroup.user === user) {
      lastGroup.messages.push({ time, text: message });
      lastGroup.endTime = time;
    } else {
      acc.push({
        user,
        messages: [{ time, text: message }],
        startTime: time,
        endTime: time
      });
    }

    return acc;
  }, []);

console.log(groupedMessages);











//==============================================================================
// EXERCISE 5: FILTERING TEST RESULTS
//==============================================================================
const testResults = `
TestCase001 PASSED 120ms memory:45MB user:alice
TestCase002 FAILED 89ms memory:32MB user:bob
TestCase003 PASSED 450ms memory:78MB user:alice
TestCase004 PASSED 67ms memory:23MB user:charlie
TestCase005 FAILED 234ms memory:156MB user:bob
TestCase006 PASSED 95ms memory:41MB user:alice
TestCase007 PASSED 520ms memory:89MB user:charlie
`;

// Task: Filter tests that PASSED, took < 200ms, and used < 50MB memory
const efficientTests = testResults
  .trim()
  .split('\n')
  .filter(line => {
    // Split each line into components
    const [testName, status, time, memory, user] = line.split(' ');

    // Extract numeric values using parseInt/parseFloat
    const timeMs = parseInt(time);  // Removes 'ms' suffix
    const memoryMB = parseInt(memory.split(':')[1]);  // Extract number from 'memory:45MB'

    // Apply all three criteria
    return status === 'PASSED' && timeMs < 200 && memoryMB < 50;
  })
  .map(line => {
    // After filtering, parse into structured objects
    const [testName, status, time, memory, user] = line.split(' ');
    return {
      test: testName,
      status,
      timeMs: parseInt(time),
      memoryMB: parseInt(memory.split(':')[1]),
      user: user.split(':')[1]
    };
  });

console.log('Efficient Tests:', efficientTests);

//==============================================================================
// EXERCISE 6: FILTERING EMPLOYEE RECORDS WITH MULTIPLE CRITERIA
//==============================================================================
const employeeRecords = `
EMP001|John Smith|Engineering|Senior|85000|2020-03-15|remote
EMP002|Jane Doe|Marketing|Junior|55000|2023-01-10|office
EMP003|Bob Johnson|Engineering|Lead|120000|2018-06-20|remote
EMP004|Alice Williams|Sales|Senior|78000|2021-09-05|office
EMP005|Charlie Brown|Engineering|Mid|72000|2022-02-14|remote
EMP006|Diana Prince|Marketing|Senior|82000|2019-11-30|office
`;

// Task: Find all Senior+ level employees in Engineering or Marketing earning > 70k
const qualifiedEmployees = employeeRecords
  .trim()
  .split('\n')
  .filter(line => {
    const [id, name, dept, level, salary, hireDate, location] = line.split('|');

    // Parse salary as number for comparison
    const salaryNum = parseInt(salary);

    // Check department (using array includes for multiple values)
    const isRightDept = ['Engineering', 'Marketing'].includes(dept);

    // Check level (using array includes again)
    const isSeniorPlus = ['Senior', 'Lead'].includes(level);

    // Salary threshold
    const meetsMinSalary = salaryNum > 70000;

    // All conditions must be true (AND logic)
    return isRightDept && isSeniorPlus && meetsMinSalary;
  })
  .map(line => {
    // Transform filtered results into clean objects
    const [id, name, dept, level, salary, hireDate, location] = line.split('|');
    return {
      id,
      name,
      department: dept,
      level,
      salary: parseInt(salary),
      yearsWithCompany: new Date().getFullYear() - new Date(hireDate).getFullYear(),
      location
    };
  });

console.log('Qualified Employees:', qualifiedEmployees);

//==============================================================================
// EXERCISE 7: FILTERING APACHE-STYLE ACCESS LOGS
//==============================================================================
const accessLog = `
192.168.1.100 - - [15/Jan/2025:10:23:45] "GET /api/users HTTP/1.1" 200 1234
192.168.1.101 - - [15/Jan/2025:10:24:12] "POST /api/login HTTP/1.1" 401 567
192.168.1.100 - - [15/Jan/2025:10:25:03] "GET /api/products HTTP/1.1" 200 8901
192.168.1.102 - - [15/Jan/2025:10:26:45] "GET /admin/users HTTP/1.1" 403 234
192.168.1.103 - - [15/Jan/2025:10:27:30] "DELETE /api/users/123 HTTP/1.1" 500 890
192.168.1.100 - - [15/Jan/2025:10:28:15] "GET /api/orders HTTP/1.1" 200 4567
`;

// Task: Find failed requests (status >= 400) with response size > 500 bytes
const failedRequests = accessLog
  .trim()
  .split('\n')
  .filter(line => {
    // Use regex to extract parts (more robust for complex formats)
    const match = line.match(/^(\S+).*?"(\w+) (\S+).*?" (\d+) (\d+)$/);

    if (!match) return false; // Skip malformed lines

    const [, ip, method, path, status, bytes] = match;

    // Convert to numbers
    const statusCode = parseInt(status);
    const responseBytes = parseInt(bytes);

    // Filter criteria: error status (>= 400) AND large response (> 500 bytes)
    return statusCode >= 400 && responseBytes > 500;
  })
  .map(line => {
    // Parse into structured format for easier analysis
    const match = line.match(/^(\S+).*?\[(.*?)\].*?"(\w+) (\S+).*?" (\d+) (\d+)$/);
    const [, ip, timestamp, method, path, status, bytes] = match;

    return {
      ip,
      timestamp,
      method,
      path,
      statusCode: parseInt(status),
      responseBytes: parseInt(bytes)
    };
  });

console.log('Failed Requests:', failedRequests);

//==============================================================================
// EXERCISE 8: FILTERING FINANCIAL TRANSACTIONS
//==============================================================================
const transactions = `
TXN001|2025-01-15|alice|DEBIT|250.00|groceries|approved
TXN002|2025-01-15|bob|CREDIT|1500.00|salary|approved
TXN003|2025-01-15|alice|DEBIT|75.50|gas|approved
TXN004|2025-01-15|charlie|DEBIT|3500.00|rent|pending
TXN005|2025-01-15|bob|DEBIT|125.00|dining|declined
TXN006|2025-01-16|alice|DEBIT|45.00|shopping|approved
TXN007|2025-01-16|charlie|CREDIT|2000.00|bonus|approved
`;

// Task: Find all DEBIT transactions > $100 that were approved
const significantDebits = transactions
  .trim()
  .split('\n')
  .filter(line => {
    const [id, date, user, type, amount, category, status] = line.split('|');

    // Convert amount string to number
    const amountNum = parseFloat(amount);

    // Multiple conditions using AND (&&)
    return type === 'DEBIT' && amountNum > 100 && status === 'approved';
  })
  .reduce((acc, line) => {
    // Group by user instead of just mapping
    const [id, date, user, type, amount, category, status] = line.split('|');

    // Initialize user if not exists
    if (!acc[user]) {
      acc[user] = {
        transactions: [],
        totalDebited: 0
      };
    }

    const amountNum = parseFloat(amount);

    // Add transaction to user's list
    acc[user].transactions.push({
      id,
      date,
      amount: amountNum,
      category
    });

    // Accumulate total
    acc[user].totalDebited += amountNum;

    return acc;
  }, {});

console.log('Significant Debits by User:', significantDebits);








//==============================================================================
// EXERCISE: COMBINING APPLICANTS WITH NET INCOMES
//==============================================================================
const applicants = [
  { userId: 'A001', name: 'Alice Johnson', email: 'alice@example.com' },
  { userId: 'A002', name: 'Bob Smith', email: 'bob@example.com' },
  { userId: 'A003', name: 'Charlie Brown', email: 'charlie@example.com' }
];

const netIncomes = [
  { netIncome: 5000, userId: 'A001' },
  { netIncome: 3000, userId: 'A002' },
  { netIncome: 2500, userId: 'A001' },
  { netIncome: 4000, userId: 'A003' },
  { netIncome: 1500, userId: 'A002' },
  { netIncome: 3500, userId: 'A001' }
];

// Solution 1: Using reduce to sum incomes per user
const totalIncomeByUser = netIncomes.reduce((acc, income) => {
  acc[income.userId] = (acc[income.userId] || 0) + income.netIncome;
  return acc;
}, {});

console.log('Total Income by User ID:', totalIncomeByUser);
// Result: { A001: 11000, A002: 4500, A003: 4000 }







// Solution 2: Combine with applicant info for full details
const applicantIncomes = applicants.map(applicant => {
  const totalIncome = netIncomes
    .filter(income => income.userId === applicant.userId)
    .reduce((sum, income) => sum + income.netIncome, 0);

  return {
    ...applicant,
    totalNetIncome: totalIncome
  };
});

console.log('Applicants with Total Income:', applicantIncomes);

// Solution 3: Using reduce to create complete objects in one pass
const applicantIncomeMap = netIncomes.reduce((acc, income) => {
  // Find the applicant
  const applicant = applicants.find(app => app.userId === income.userId);

  if (!acc[income.userId]) {
    acc[income.userId] = {
      ...applicant,
      totalNetIncome: 0
    };
  }

  acc[income.userId].totalNetIncome += income.netIncome;
  return acc;
}, {});

console.log('Complete Applicant Income Map:', applicantIncomeMap);




//==============================================================================
// SCENARIO: APPLICANT AND INCOMES IN SAME INPUT OBJECT
//==============================================================================

// Pattern 1: Nested arrays as properties
const input1 = {
  applicants: [
    { userId: 'A001', name: 'Alice Johnson', email: 'alice@example.com' },
    { userId: 'A002', name: 'Bob Smith', email: 'bob@example.com' }
  ],
  netIncomes: [
    { netIncome: 5000, userId: 'A001' },
    { netIncome: 3000, userId: 'A002' },
    { netIncome: 2500, userId: 'A001' }
  ]
};

// Solution for Pattern 1
const result1 = input1.applicants.map(applicant => {
  const totalIncome = input1.netIncomes
    .filter(income => income.userId === applicant.userId)
    .reduce((sum, income) => sum + income.netIncome, 0);

  return { ...applicant, totalNetIncome: totalIncome };
});

console.log('Pattern 1 Result:', result1);

// Pattern 2: Each applicant has incomes array embedded
const input2 = [
  {
    userId: 'A001',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    incomes: [5000, 2500, 3500]
  },
  {
    userId: 'A002',
    name: 'Bob Smith',
    email: 'bob@example.com',
    incomes: [3000, 1500]
  }
];

// Solution for Pattern 2
const result2 = input2.map(applicant => ({
  ...applicant,
  totalNetIncome: applicant.incomes.reduce((sum, income) => sum + income, 0),
  incomes: undefined // Remove if you don't want it in output
}));

console.log('Pattern 2 Result:', result2);

// Pattern 3: Each applicant has detailed income objects
const input3 = [
  {
    userId: 'A001',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    incomes: [
      { amount: 5000, source: 'salary' },
      { amount: 2500, source: 'bonus' }
    ]
  }
];

// Solution for Pattern 3
const result3 = input3.map(applicant => ({
  userId: applicant.userId,
  name: applicant.name,
  email: applicant.email,
  totalNetIncome: applicant.incomes.reduce((sum, inc) => sum + inc.amount, 0),
  incomeSources: applicant.incomes.map(inc => inc.source)
}));

console.log('Pattern 3 Result:', result3);