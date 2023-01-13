// import { Inter } from '@next/font/google';
// const inter = Inter({ subsets: ['latin'] });

import { Htag, Button, P, Tag } from '../components';

export default function Home():JSX.Element {
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
    </>

  );
}

