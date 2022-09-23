

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Product from '../_assets/images/shop/1.jpg'
import axios from 'axios';
import {useCategoryStore} from "../../mobx/CategoryStore";
import {useTagsStore} from "../../mobx/TagsStore";

// { setProducts,cats,tags }
const Sidebar = () => {
    const {categories} = useCategoryStore();
    const {tags} = useTagsStore();

    const [search,setSearch] = useState('');

    // Product search by categories
    const handleCatSearch = useCallback((e: React.MouseEvent<HTMLAnchorElement>,id: any) => {
        e.preventDefault();
        setSearch('');
        // axios.get(`http://localhost:5001/catagory/${ id }/products`).then(res => {
        //     setProducts(res.data)
        // });
    }, []);

    // Product search by tag
    const handleTagSearch = useCallback((e,id) => {
        e.preventDefault();
        setSearch('');
        // axios.get(`http://localhost:5001/tag/${ id }/products`).then(res => {
        //     setProducts(res.data)
        // });
    }, []);

    useEffect(() => {
        // if (search !== '') {
        //     axios.get(`http://localhost:5050/products?q=${ search }`).then(res => {
        //         setProducts(res.data)
        //     },[]);
        // }
    }, []);

    const renderTags = useMemo(() => tags.map(data =>
            <a onClick={ (e) => handleTagSearch(e,data.id) } href="http">{data.name}</a>
        ), []);

    const renderCategories = useMemo(() => categories.map(data => <li>
        <a onClick={ (e) => handleCatSearch(e,data.id ) } href="http" >{ data.name }</a>
    </li>), []);

    return (
        <>
            <div className={'sidebar'}>
                <div className="widget">
                    <h6 className="upper">Search Shop</h6>
                    <form>
                        <input type="text" placeholder="Search.." value={search}
                               onChange={e => setSearch(e.target.value)} className="form-control" />
                    </form>
                </div>
                <div className="widget">
                    <h6 className="upper">Categories</h6>
                    <ul className="nav d-block">
                        {renderCategories}
                    </ul>
                </div>

                <div className="widget">
                    <h6 className="upper">Popular Tags</h6>
                    <div className="tags clearfix">
                        {renderTags}
                    </div>
                </div>

                <div className="widget">
                    <h6 className="upper">Trending Products</h6>
                    <ul className="nav product-list">
                        <li>
                            <div className="product-thumbnail">
                                <img src={Product} alt="" />
                            </div>
                            <div className="product-summary"><a href="https://">Premium Suit Blazer</a><span>$199.99</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
