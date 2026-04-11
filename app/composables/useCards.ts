import type { Card, CardPayload } from '../types';

export const useCards = () => {
    const { $axios } = useNuxtApp();

    const cards = useState<Card[]>('cards', () => []);

    const getCards = async (tags?: string[]) => {
        const params = tags ? { tags: tags.join(',') } : {};
        try {
            const { data } = await $axios.get<Card[]>('/cards', { params });
            cards.value = data;
            return data;
        } catch (error) {
            console.error('Error fetching cards:', error);
            return [];
        }
    };

    const createCard = async (payload: CardPayload) => {
        try {
            const { data } = await $axios.post<Card>('/cards', payload);
            cards.value.push(data);
            return data;
        } catch (error) {
            console.error('Error creating card:', error);
            throw error;
        }
    };

    const getQuizzCards = async (date?: string) => {
        const params = date ? { date } : {};
        try {
            const { data } = await $axios.get<Card[]>('/cards/quizz', { params });
            return data;
        } catch (error) {
            console.error('Error fetching quiz cards:', error);
            return [];
        }
    };

    const answerCard = async (cardId: string, isValid: boolean) => {
        try {
            await $axios.patch(`/cards/${cardId}/answer`, { isValid });
        } catch (error) {
            console.error('Error answering card:', error);
            throw error;
        }
    };

    return {
        cards,
        getCards,
        createCard,
        getQuizzCards,
        answerCard,
    };
};
