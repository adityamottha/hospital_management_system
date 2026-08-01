'use client';

import React from 'react';

// Define the Department type
interface Department {
  name: string;
  head: string;
  rooms: number;
}

// Define props interface
interface DepartmentsProps {
  title?: string;
  departments?: Department[];
  showActions?: boolean;
  actionButtonText?: string;
  onViewDetails?: (departmentName: string, departmentHead: string) => void;
  onActionClick?: (department: Department) => void;
}

// Default departments data
const defaultDepartments: Department[] = [
  { name: 'Emergency Medicine', head: 'Dr. A. Kumar', rooms: 15 },
  { name: 'Surgery', head: 'Dr. S. Singh', rooms: 20 },
  { name: 'Obstetrics & Gynecology', head: 'Dr. M. Sharma', rooms: 12 },
  { name: 'Dermatology', head: 'Dr. R. Patel', rooms: 8 },
  { name: 'Psychiatry', head: 'Dr. V. Reddy', rooms: 10 },
  { name: 'Radiology', head: 'Dr. P. Joshi', rooms: 6 },
];

const Departments: React.FC<DepartmentsProps> = ({
  title = "Departments",
  departments = defaultDepartments,
  showActions = true,
  actionButtonText = "View Details",
  onViewDetails,
  onActionClick,
}) => {
  const handleActionClick = (department: Department) => {
    if (onActionClick) {
      onActionClick(department);
    } else if (onViewDetails) {
      onViewDetails(department.name, department.head);
    } else {
      console.log(`View details for ${department.name}`);
    }
  };

  return (
    <section id="departments" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-hospital-dark">{title}</h2>
          <div className="w-20 h-1 bg-hospital-blue mx-auto mt-2"></div>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-hospital-blue text-white">
              <tr>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Head of Department</th>
                <th className="px-6 py-4">Rooms</th>
                {showActions && <th className="px-6 py-4">Action</th>}
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 font-medium">{dept.name}</td>
                  <td className="px-6 py-4">{dept.head}</td>
                  <td className="px-6 py-4">{dept.rooms}</td>
                  {showActions && (
                    <td className="px-6 py-4">
                      <button 
                        className="bg-hospital-blue text-white px-4 py-1 rounded-full hover:bg-blue-700 text-sm transition"
                        onClick={() => handleActionClick(dept)}
                      >
                        {actionButtonText}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Departments;