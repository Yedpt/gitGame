import React, { useEffect, useState } from 'react';
import { fetchUpcomingReleases } from '../services/releasesService';
import MonthSection from '../components/MonthSection';

const UpcomingReleases = () => {
  const [releasesData, setReleasesData] = useState([]);

  useEffect(() => {
    const loadReleases = async () => {
      const data = await fetchUpcomingReleases();
      setReleasesData(data);
    };

    loadReleases();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">Derniers Lancements</h1>
      </header>
      {releasesData && releasesData.map((monthData) => (
        <MonthSection key={monthData.month} monthData={monthData} />
      ))}
      <footer className="text-center mt-6 text-sm">
        <p>© Tous droits réservés. GitGame 2024.</p>
      </footer>
    </div>
  );
};

export default UpcomingReleases;
