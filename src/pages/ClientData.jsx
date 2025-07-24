import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { BASE_URL } from '../baseurl';
import LoadingButton from '../components/LoadingButton'; // ✅ Import LoadingButton

const ClientData = () => {
  const [clients, setClients] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // ✅ Loading states for each button
  const [downloading, setDownloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);

  const fetchClients = () => {
    fetch(`${BASE_URL}/support/all`)
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error('Error fetching data:', err));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const downloadExcel = () => {
    setDownloading(true);
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(clients);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');

      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(file, 'ClientData.xlsx');

      setDownloading(false);
    }, 500); // simulate slight delay
  };

  const toggleSelectAll = () => {
    setToggling(true);

    setTimeout(() => {
      if (selectAll) {
        setSelectedIds([]);
      } else {
        const allIds = clients.map((client) => client.id);
        setSelectedIds(allIds);
      }
      setSelectAll(!selectAll);
      setToggling(false);
    }, 300); // simulate slight delay
  };

  const toggleCheckbox = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteSelectedClients = () => {
    if (selectedIds.length === 0) return alert("No clients selected.");

    const confirmDelete = window.confirm("Are you sure you want to delete selected clients?");
    if (!confirmDelete) return;

    setDeleting(true);

    fetch(`${BASE_URL}/support/selected`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedIds }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Selected clients deleted successfully.");
        setSelectedIds([]);
        setSelectAll(false);
        fetchClients();
      })
      .catch((err) => {
        console.error("Error deleting clients:", err);
        alert("Failed to delete selected clients.");
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Client Support Data</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <LoadingButton
          isLoading={downloading}
          onClick={downloadExcel}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download Excel
        </LoadingButton>

        {selectedIds.length > 0 && (
          <LoadingButton
            isLoading={deleting}
            onClick={deleteSelectedClients}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Selected ({selectedIds.length})
          </LoadingButton>
        )}

        <LoadingButton
          isLoading={toggling}
          onClick={toggleSelectAll}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {selectAll ? "Deselect All" : "Select All"}
        </LoadingButton>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Select</th>
              <th className="px-4 py-2 border">S.No</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={client.id} className="border-t">
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(client.id)}
                    onChange={() => toggleCheckbox(client.id)}
                  />
                </td>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{client.name}</td>
                <td className="px-4 py-2 border">{client.phone}</td>
                <td className="px-4 py-2 border">{client.gmail}</td>
                <td className="px-4 py-2 border">{client.message}</td>
                <td className="px-4 py-2 border">
                  {new Date(client.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientData;
