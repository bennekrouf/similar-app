import { Logger } from "mayo-logger";
import { Item } from "../models/AnswerStat";
import { syncStorage } from "../storage/syncStorage";

export const updateAnswerStats = (item: Item, setAnswerStats: any) => {
    const now = new Date();
    const updatedAt = Math.floor(now.getTime() / 1000);

    setAnswerStats(prevStats => {
        const existingStat = prevStats?.find(stat => stat.id === item.id);
        let res: any[];
        if (existingStat) {
            res = prevStats.map(stat => 
                stat.id === item.id 
                ? { 
                    ...stat, 
                    g: stat.g + (item.valid ? 1 : 0),
                    w: stat.w + (item.valid ? 0 : 1),
                    updatedAt
                  }
                : stat
            );
        } else {
            res = [
                ...prevStats, 
                { 
                    id: item.id, 
                    g: item.valid ? 1 : 0, 
                    w: item.valid ? 0 : 1,
                    updatedAt
                }
            ];
        }
        Logger.info('Answer stats updated.', res, { tag: 'Exercise:updateAnswerStats' });
        syncStorage(res);
        return res;
    });
  };