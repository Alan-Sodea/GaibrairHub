import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { MentorList } from '../components/mentoring/MentorList';
import { Input } from '../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { useHookstate } from '@hookstate/core';
import { User } from '../types';
import { globalState } from '../store';
import { Button } from '../components/ui/Button';

export const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const state = useHookstate(globalState);
  const mentors = state.users.get();
  const currentUser = state.currentUser.get();
  const sectors = [
    'Tous les secteurs',
    'Technology',
    'Marketing',
    'Finance',
    'E-commerce',
    'Santé',
  ];

  const check_sill = (elt: [String], text: String) => {
    console.log({ elt, text })
    if (elt.length <= 0) return false;
    for (let i = 0; i < elt.length; i++) {
      if (elt[i].split(" ").join("").toLowerCase().includes(text.split(" ").join("").toLowerCase())) return true;
    }
    return false
  }

  useEffect(() => {
    const elt = mentors[0];
    console.log()
  })


  return (
    currentUser && (<div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Trouvez votre mentor idéal
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            icon={<Search className="w-5 h-5" />}
            placeholder="Rechercher par nom ou compétence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 
              focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
              dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mentors.filter((elt) => elt.fullName.split(" ").join("").toLowerCase().includes(searchTerm.split(" ").join("").toLowerCase()) || check_sill(elt.skills, searchTerm.split(" ").join("").toLowerCase())).filter((elt) => selectedSector == "Tous les secteurs" || elt.sector.split(" ").join("").toLowerCase().includes(selectedSector.split(" ").join("").toLowerCase()) || selectedSector.split(" ").join("").toLowerCase().includes(elt.sector.split(" ").join("").toLowerCase())).map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>)
  );
};



const MentorCard = ({ mentor }: { mentor: User }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/user/${mentor._id}`)}
      className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center space-x-4">
        <img
          src={mentor.profilePhoto || "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg"}
          alt={mentor.fullName}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mentor.fullName}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{mentor.sector}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {mentor.skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{mentor.bio}</p>
      </div>
      <div className="mt-6">
        <Button variant="outline" fullWidth>
          Contacter
        </Button>
      </div>
    </div>
  );
};