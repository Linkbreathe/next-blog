import Featured from "@/components/featured/Featured";
import styles from "../homepage.module.css";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from '@/components/Menu/Menu'


export default function Home({ searchParams }) {
  const page = searchParams.page || 1
  return (
    <div className={styles.container}>
      <Featured />
      {/* <CategoryList /> */}
      {/* <MyMapComponent isMarkerShown /> */}
      {/* <MapRender /> */}
      <div className={styles.content}>
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
}
