import { useParams } from 'react-router-dom'
import { useLearnRandomCardQuery } from '@/api/decks/decks.api.ts'

export const LearnPack = () => {
  const { id } = useParams()
  const { data: learnCard } = useLearnRandomCardQuery(id!)

  console.log(learnCard)
  return (
    <div style={{ color: 'red' }}>
      <p> {learnCard?.question}</p>
      <p> {learnCard?.answer}</p>

      <img src={learnCard?.questionImg} alt="" />
      <img src={learnCard?.answerImg} alt="" />

      {/* Ваши компоненты для отображения данных */}
    </div>
  )
}
