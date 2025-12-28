// Admin Panel JavaScript for Mindful Space
let allContacts = [];
let filteredContacts = [];

// Load contacts from Firestore
async function loadContacts() {
  try {
    const loadingElement = document.getElementById('loading');
    const tableElement = document.getElementById('contacts-table');
    const noDataElement = document.getElementById('no-data');
    
    loadingElement.style.display = 'block';
    tableElement.style.display = 'none';
    noDataElement.style.display = 'none';

    const contactsRef = collection(window.db, 'contacts');
    const q = query(contactsRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    allContacts = [];
    querySnapshot.forEach((doc) => {
      const contact = {
        id: doc.id,
        ...doc.data()
      };
      // Convert Firestore timestamp to JavaScript Date
      if (contact.timestamp && contact.timestamp.toDate) {
        contact.timestamp = contact.timestamp.toDate();
      }
      allContacts.push(contact);
    });

    filteredContacts = [...allContacts];
    updateStats();
    displayContacts();
    
    loadingElement.style.display = 'none';
    tableElement.style.display = 'table';
    
  } catch (error) {
    console.error('Error loading contacts:', error);
    document.getElementById('loading').innerHTML = 'Error loading contacts. Please refresh the page.';
  }
}

// Update statistics
function updateStats() {
  const totalContacts = allContacts.length;
  const newContacts = allContacts.filter(c => c.status === 'new').length;
  const highPriority = allContacts.filter(c => c.urgency === 'high' || c.urgency === 'emergency').length;
  const emergencyContacts = allContacts.filter(c => c.urgency === 'emergency').length;

  document.getElementById('total-contacts').textContent = totalContacts;
  document.getElementById('new-contacts').textContent = newContacts;
  document.getElementById('high-priority').textContent = highPriority;
  document.getElementById('emergency-contacts').textContent = emergencyContacts;
}

// Display contacts in table
function displayContacts() {
  const tbody = document.getElementById('contacts-tbody');
  const noDataElement = document.getElementById('no-data');
  
  if (filteredContacts.length === 0) {
    tbody.innerHTML = '';
    noDataElement.style.display = 'block';
    return;
  }

  noDataElement.style.display = 'none';
  
  tbody.innerHTML = filteredContacts.map(contact => `
    <tr>
      <td><strong>${contact.name || 'N/A'}</strong></td>
      <td><a href="mailto:${contact.email}">${contact.email || 'N/A'}</a></td>
      <td>${contact.phone || 'N/A'}</td>
      <td>${contact.service || 'N/A'}</td>
      <td class="${contact.urgency === 'emergency' ? 'urgency-emergency' : contact.urgency === 'high' ? 'urgency-high' : ''}">
        ${getUrgencyText(contact.urgency)}
      </td>
      <td>
        <span class="status-badge status-${contact.status || 'new'}">
          ${(contact.status || 'new').replace('-', ' ')}
        </span>
      </td>
      <td>${formatDate(contact.timestamp)}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-small btn-update" onclick="updateContactStatus('${contact.id}', '${contact.status || 'new'}')">
            Update
          </button>
          <button class="btn-small btn-delete" onclick="deleteContact('${contact.id}')">
            Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Get urgency display text
function getUrgencyText(urgency) {
  const urgencyMap = {
    'low': 'General',
    'medium': 'Medium',
    'high': 'High',
    'emergency': 'Emergency'
  };
  return urgencyMap[urgency] || 'Unknown';
}

// Format date for display
function formatDate(date) {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Filter contacts based on search and filters
function filterContacts() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const statusFilter = document.getElementById('status-filter').value;
  const urgencyFilter = document.getElementById('urgency-filter').value;

  filteredContacts = allContacts.filter(contact => {
    const matchesSearch = !searchTerm || 
      (contact.name && contact.name.toLowerCase().includes(searchTerm)) ||
      (contact.email && contact.email.toLowerCase().includes(searchTerm)) ||
      (contact.message && contact.message.toLowerCase().includes(searchTerm));
    
    const matchesStatus = !statusFilter || contact.status === statusFilter;
    const matchesUrgency = !urgencyFilter || contact.urgency === urgencyFilter;

    return matchesSearch && matchesStatus && matchesUrgency;
  });

  displayContacts();
}

// Update contact status
async function updateContactStatus(contactId, currentStatus) {
  const newStatus = prompt(`Current status: ${currentStatus}\n\nEnter new status (new, in-progress, completed):`, currentStatus);
  
  if (newStatus && newStatus !== currentStatus && ['new', 'in-progress', 'completed'].includes(newStatus)) {
    try {
      const contactRef = doc(window.db, 'contacts', contactId);
      await updateDoc(contactRef, {
        status: newStatus,
        lastUpdated: new Date()
      });
      
      // Update local data
      const contact = allContacts.find(c => c.id === contactId);
      if (contact) {
        contact.status = newStatus;
        contact.lastUpdated = new Date();
      }
      
      updateStats();
      displayContacts();
      alert('Contact status updated successfully!');
      
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Error updating contact status. Please try again.');
    }
  }
}

// Delete contact
async function deleteContact(contactId) {
  if (confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
    try {
      await deleteDoc(doc(window.db, 'contacts', contactId));
      
      // Update local data
      allContacts = allContacts.filter(c => c.id !== contactId);
      filteredContacts = filteredContacts.filter(c => c.id !== contactId);
      
      updateStats();
      displayContacts();
      alert('Contact deleted successfully!');
      
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error deleting contact. Please try again.');
    }
  }
}

// Refresh data
function refreshData() {
  loadContacts();
}

// Search functionality with real-time filtering
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const statusFilter = document.getElementById('status-filter');
  const urgencyFilter = document.getElementById('urgency-filter');
  
  // Add event listeners for real-time filtering
  searchInput.addEventListener('input', filterContacts);
  statusFilter.addEventListener('change', filterContacts);
  urgencyFilter.addEventListener('change', filterContacts);
  
  // Load contacts when page loads
  loadContacts();
});

// Export data functionality
function exportData() {
  const data = filteredContacts.map(contact => ({
    Name: contact.name || 'N/A',
    Email: contact.email || 'N/A',
    Phone: contact.phone || 'N/A',
    Service: contact.service || 'N/A',
    Urgency: contact.urgency || 'N/A',
    Status: contact.status || 'new',
    Message: contact.message || 'N/A',
    Date: formatDate(contact.timestamp)
  }));

  const csv = convertToCSV(data);
  downloadCSV(csv, 'mindful-space-contacts.csv');
}

function convertToCSV(data) {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
  ].join('\n');
  return csvContent;
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Auto-refresh every 30 seconds
setInterval(loadContacts, 30000);
