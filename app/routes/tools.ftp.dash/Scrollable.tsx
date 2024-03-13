import styles from './scrollable.module.css';
export default function Scrollable({children}:{children:React.ReactNode}){
    return(
        <div className={`overflow-y-scroll h-full ${styles.scrollbar}`}>
            {children}
        </div>
    )
}