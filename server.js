const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = 3000;

app.use(express.json());

// Data structures for priority queue and history stack
const complaintsQueue = []; // Priority queue to store complaints
const resolvedStack = [];   // Stack to store resolved complaints

// Function to assign priority based on complaint type
function assignPriority(complaint) {
    if (complaint.issueType === 'health-risk' || complaint.sensitiveArea) {
        return 1;  // High priority
    } else if (complaint.issueType === 'missed-pickup') {
        return 2;  // Medium priority
    }
    return 3;      // Low priority
}

// Helper function to log data to a CSV file
async function logResolvedComplaint(complaint) {
    const logEntry = `${new Date().toISOString()},${complaint.id},${complaint.issueType},${complaint.status}\n`;
    await fs.appendFile('resolved_complaints.csv', logEntry);
}

app.get('/', (req, res) => {
    res.send("Server is Running!");
});

// POST /complaints - Create a new complaint
app.post('/complaints', (req, res) => {
    const { id, issueType, sensitiveArea } = req.body;
    const complaint = { id, issueType, sensitiveArea, status: 'pending' };
    complaint.priority = assignPriority(complaint);
    complaintsQueue.push(complaint);

    complaintsQueue.sort((a, b) => a.priority - b.priority); // Maintain priority order
    res.status(201).json({ message: 'Complaint registered successfully', complaint });
});

// GET /complaints - Retrieve pending complaints (sorted by priority)
app.get('/complaints', (req, res) => {
    res.json(complaintsQueue);
});

// POST /resolve - Mark a complaint as resolved and store it in history
app.post('/resolve', async (req, res) => {
    const { id } = req.body;
    const complaintIndex = complaintsQueue.findIndex(complaint => complaint.id === id);

    if (complaintIndex === -1) {
        return res.status(404).json({ message: 'Complaint not found' });
    }

    const [resolvedComplaint] = complaintsQueue.splice(complaintIndex, 1);
    resolvedComplaint.status = 'resolved';
    resolvedStack.push(resolvedComplaint);
    await logResolvedComplaint(resolvedComplaint);

    res.json({ message: 'Complaint resolved successfully', resolvedComplaint });
});

// GET /undo - Undo the last resolved complaint (backtracking)
app.get('/undo', (req, res) => {
    if (resolvedStack.length === 0) {
        return res.status(400).json({ message: 'No resolved complaints to undo' });
    }

    const lastResolved = resolvedStack.pop();
    lastResolved.status = 'pending';
    complaintsQueue.push(lastResolved);
    complaintsQueue.sort((a, b) => a.priority - b.priority);

    res.json({ message: 'Last resolution undone', lastResolved });
});

// GET /logs - Fetch the daily log of resolved complaints
app.get('/logs', async (req, res) => {
    try {
        const data = await fs.readFile('resolved_complaints.csv', 'utf-8');
        res.send(data);
    } catch (error) {
        res.status(500).json({ message: 'Error reading logs', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
