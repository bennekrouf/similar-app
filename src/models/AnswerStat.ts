export type AnswerStat = {
    id: string;
    g: number;
    w: number;
    updatedAt: number;
  };

export interface Alternative {
  id: string;
  original: string;
  explanation: string;
  valid?: boolean;
}

export const getNextSuggestedQuestion = (alternatives: Alternative[][], stats: AnswerStat[]): 
  Alternative => {
  // Flatten the alternatives array
  const flatAlternatives = [].concat(...alternatives);

  // Create a default stat for alternatives not answered yet
  const getStatForQuestion = (id) => (
    stats.find(stat => stat.id === id) || { id, g: 0, w: 0, updatedAt: 0 }
  );

  // Sort based on the mentioned criteria
  flatAlternatives.sort((a, b) => {
    const statA = getStatForQuestion(a.id);
    const statB = getStatForQuestion(b.id);

    if (statA.updatedAt !== statB.updatedAt) {
      return statA.updatedAt - statB.updatedAt;
    }

    if (statA.w !== statB.w) {
      return statB.w - statA.w;
    }

    return statA.g - statB.g;
  });

  // Return the first item from the sorted alternatives
  return flatAlternatives[0];
};