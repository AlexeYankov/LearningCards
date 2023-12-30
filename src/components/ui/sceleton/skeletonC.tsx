import s from './skeleton.module.scss'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
type Props = {
    isLoadingD?: boolean
    count?: number
    type?: string
    width?: number
    height?: number
}
export const SkeletonC = ({width, height}: Props) => {

    return (
        <div className={s.list}>
            <Skeleton className={s.item} width={width} height={height}/>
            {/*<Skeleton count={10} width={90} className={s.item}/>*/}
            {/*<div className={s.cardsSkel}>*/}
            {/*    <Skeleton className={s.item} count={10} width={10}/>*/}
            {/*</div>*/}
            {/*<div className={s.cardsSkel}>*/}
            {/*    <Skeleton className={s.item} count={10} width={90}/>*/}
            {/*</div>*/}
            {/*<div className={s.cardsSkel}>*/}
            {/*    <Skeleton className={s.item} count={10} width={80}/>*/}
            {/*</div>*/}
            {/*<div className={s.cardsSkel}>*/}
            {/*    <Skeleton className={s.item} count={10} width={10}/>*/}
            {/*</div>*/}
        </div>
    )
}

{/*{count > 1 ? (*/
}
{/*    <ul>*/
}
{/*        {[Array(count)].map((_, index) => (*/
}
{/*            <li*/
}
{/*                key={index}*/
}
{/*                className={type === "banner" ? s.banner : s.item}></li>*/
}
{/*        ))}*/
}
{/*    </ul>*/
}
{/*) : (*/
}
{/*    <li className={type === "banner" ? s.banner : s.item}></li>*/
}

{/*)*/
}
{/*}*/
}