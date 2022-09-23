import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Route, Routes } from "react-router-dom";
// import ProductSingle from "./components/Pages/ProductSingle";
// import Dashbord from "./components/Admin/Dashbord";
// import Dash from "./components/Admin/Dash";
// import Products from "./components/Admin/Products";
// import Product_add from "./components/Admin/Products/Product_add";
// import Category from "./components/Admin/Category/Category";
// import Tag from "./components/Admin/Tag";
// import AddTag from "./components/Admin/AddTag";
// import Footer from "./components/Footer/Footer";
// import { useProductsStore } from "./mobx/ProductsStore";
// import MobxController from "./mobx/MobxController";
// import { Action } from "./Constains/Constains";
// import { useTagsStore } from "./mobx/TagsStore";
import HeaderApp from "../Screens/HeaderApp";
import MobxController from "../mobx/MobxController";
import {Action} from "../Constains/Constains";
import {useProductsStore} from "../mobx/ProductsStore";
import {useTagsStore} from "../mobx/TagsStore";
import Shop from "../components/Pages/Shop/Show";
import ProductSingle from "../components/Pages/ProductSingle/ProductSingle";
import Footer from "../components/Footer/Footer";

const dataProducts$ = new MobxController().loadDataRX(Action.GET_DATA.PRODUCT);

const dataTags$ = new MobxController().loadDataRX(Action.GET_DATA.TAGS);

const App = observer(() => {
    const { dataFilter, add } = useProductsStore();
    const tagStore = useTagsStore();

    useEffect(() => {
        const sub = dataProducts$.subscribe((data: any) => {
            add(data);
        });

        return () => sub.unsubscribe();
    }, [add]);

    useEffect(() => {
        const sub = dataTags$.subscribe((data: any) => {
            tagStore.add(data);
        });

        return () => sub.unsubscribe();
    }, [tagStore]);

    /// / get product
    const [products, setProducts] = useState([]);

    console.log('data: ', dataFilter);

    return (
        <>
            <HeaderApp />
            <Routes>
                <Route path="/" element={<Shop products={dataFilter} />} />
                <Route path="/shop" element={<Shop products={dataFilter} />} />
                <Route path="/shop/:id" element={<ProductSingle />} />
            {/*    /!*<Route path="/admin" element={<Dashbord />}>*!/*/}
            {/*    /!*    <Route path="/admin/dash" element={<Dash />} />*!/*/}
            {/*    /!*    <Route*!/*/}
            {/*    /!*        path="/admin/products"*!/*/}
            {/*    /!*        element={<Products products={products} />}*!/*/}
            {/*    /!*    />*!/*/}
            {/*    /!*    /!* eslint-disable-next-line react/jsx-pascal-case *!/*!/*/}
            {/*    /!*    <Route path="/admin/add-products" element={<Product_add />} />*!/*/}
            {/*    /!*    <Route path="/admin/category" element={<Category />} />*!/*/}
            {/*    /!*    <Route path="/admin/tag" element={<Tag />} />*!/*/}
            {/*    /!*    <Route path="/admin/add-tag" element={<AddTag />} />*!/*/}
            {/*    /!*</Route>*!/*/}
            </Routes>
            <Footer />
        </>
    );
});

export default App;
