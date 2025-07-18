import styles from './CarsLayout.module.css'
import useCars from '../hooks/useCars.ts'
import Navbar from '../components/Navbar/Navbar.tsx'
import CardList from '../components/CardList/CardList.tsx'

function CarsLayout() {
    const { cars, loading, error } = useCars();

    if (loading) return <p>Загрузка...</p>
    if (error) return <p>Ошибка</p>

    return (
        <div className={styles.layout}>
            <Navbar data={cars}></Navbar>
            <CardList data={cars}></CardList>
        </div>
    )
}

export default CarsLayout;