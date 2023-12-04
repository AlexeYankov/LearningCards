import {useParams} from "react-router-dom";
import {useLearnRandomCardQuery} from "@/api/decks/decks.api.ts";

export const LearnPack = () => {
    const {id}= useParams()
    const { data: learnCard } = useLearnRandomCardQuery(id)
    return (
        <div>
            {learnCard?.name}
            {/* Ваши компоненты для отображения данных */}
        </div>
    );
};

