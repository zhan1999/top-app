// import { Inter } from '@next/font/google';
// const inter = Inter({ subsets: ['latin'] });

import { useState } from 'react';
import { Htag, Button, P, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';
   
function Home():JSX.Element {
  const [rating, setRating] = useState<number>(4);
  
  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button> 
      <P size='s'>Маленький параграф</P>
      <P>Средний параграф</P>
      <P size='l'>Большой параграф</P>
      <Tag size='s'>Мал</Tag>
      <Tag size='m'>Ghost</Tag>
      <Tag size='s' color='red'>Red</Tag>
      <Tag size='m' color='green'>Green</Tag>
      <Tag color='primary'>Primary</Tag>
      <Rating isEditable rating={rating} setRating={setRating} /> 
    </>

  );
}

export default withLayout(Home);
