import s from './GraphAnimation.module.css';
import Image from 'next/image';
import graphImg from '../../../public/images/graph.png';

export default function GraphAnimation() {
  return (
    <div className={s['graph-box']}>
      <Image className={s['graph-box__image']} src={graphImg} alt="GraphQL" width={250} height={250} priority />
    </div>
  );
}
