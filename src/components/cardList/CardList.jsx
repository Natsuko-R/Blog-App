import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { POST_PER_PAGE } from "@/app/api/posts/route";

const getData = async (page, cat) => {
    const res = await fetch(`http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        console.error(`Failed to fetch data. Status: ${res.status}`);
        throw new Error("Failed");
    }

    return res.json();
};

const CardList = async ({ page, cat }) => {

    const { posts, count } = await getData(page, cat);

    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recent Posts</h1>
            {posts?.map((item) => (
                <Card key={item._id} item={item} />
            ))}
            <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
        </div>
    );
};

export default CardList;
