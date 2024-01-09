import { useState, useEffect, useContext } from 'react';
import { Logger } from 'mayo-logger';
import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { currentStorage } from '../storage/currentStorage';

export const useInitialSettings = () => {
  const [selectedSourates, setselectedSourates] = useState<string[]>([]);
  const { user } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    const fetchInitialSettings = async () => {
      try {
        if (!user) return;
        const res = await currentStorage();
        if (res?.knownSourates) {
          setselectedSourates(res.knownSourates);
        }
        Logger.info('Fetched initial settings.', { selectedSourates }, { tag: 'useInitialSettings' });
      } catch (error) {
        Logger.error('Error fetching initial settings.', error, { tag: 'useInitialSettings' });
      }
    };

    fetchInitialSettings();
  }, [user]);

  return selectedSourates;
};
