// import { Inter } from '@next/font/google';
// const inter = Inter({ subsets: ['latin'] });

import { Htag, Button, P } from '../components';

export default function Home():JSX.Element {
  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button> 
      <P size='s'>Маленький параграф</P>
      <P>Средний параграф</P>
      <P size='l'>Большой параграф</P>
    </>

  );
}

