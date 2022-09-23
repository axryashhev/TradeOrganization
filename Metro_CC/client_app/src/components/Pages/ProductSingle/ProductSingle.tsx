import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Link, useParams } from "react-router-dom";
import { toJS } from "mobx";
import {useProductsStore} from "../../../mobx/ProductsStore";
import {useCategoryStore} from "../../../mobx/CategoryStore";
import {useTagsStore} from "../../../mobx/TagsStore";
import {usePayStore} from "../../../mobx/PayStore";
import {MoneyValue} from "../../../Constains/Constains";
import {Product} from "../../../Models/Product";
// import Rating from "./Rating";

const ProductSingle = observer(() => {
    const { findProduct, productsData } = useProductsStore();
    const { findCategory } = useCategoryStore();
    const { findTag } = useTagsStore();
    const { add } = usePayStore();
    const { id } = useParams();

    const [count, setCount] = useState(1);
    const [product, setProduct] = useState<Product | undefined>(
        toJS(findProduct(id ?? "-1"))
    );

    const [update, setUpdate] = useState(product?.id === id);

    useEffect(() => {
        if (product?.id !== id) {
            setUpdate(false);
        }
    }, [id, product?.id]);

    const [relatedProducts, setRelatedProducts] = useState<Array<Product>>(
        productsData.slice(0, 2)
    );

    useEffect(() => {
        if (productsData.length !== 0 && !update) {
            setUpdate(true);
            setProduct(toJS(findProduct(id ?? "-1")));
            setRelatedProducts(productsData.slice(0, 2));
        }
    }, [findProduct, id, product?.id, productsData, productsData.length, update]);

    const addToCard = useCallback(() => {
        for (let i = 0; i < count; i++) {
            if (product) {
                add(product);
            }
        }
    }, [add, product, count]);

    return (
        <section>
            <div className="container">
                <div className="single-product-details">
                    <div className="row">
                        <div className="col-md-6">
                            <div
                                data-options='{"animation": "slide", "controlNav": true}'
                                className="flexslider nav-inside control-nav-dark"
                            >
                                <img src={product?.photo} alt="" />
                            </div>
                        </div>
                        <div className="col-md-5 col-md-offset-1">
                            <div className="title mt-0">
                                <h2>
                                    {product?.name}
                                    <span className="red-dot" />
                                </h2>
                                <p className="m-0">Бесплатная доставка по всему миру</p>
                            </div>
                            <div className="single-product-price">
                                <div className="row">
                                    <div className="col-xs-6">
                                        {product?.sale_price ? (
                                            <h3>
                                                {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                                                <del>{product?.regular_price + MoneyValue.DOLLAR}</del>
                                                {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                                                <span>{product?.sale_price + MoneyValue.DOLLAR}</span>
                                            </h3>
                                        ) : (
                                            <h3>
                        <span>
                          {(product?.regular_price ?? "0") + MoneyValue.DOLLAR}
                        </span>
                                            </h3>
                                        )}
                                    </div>
                                    <div className="col-xs-6 text-right">
                                        {/*<Rating rate={product?.rating || ""} />*/}
                                    </div>
                                </div>
                            </div>
                            <div className="single-product-desc">
                                <p>{product?.description}</p>
                            </div>
                            <div className="single-product-add">
                                <form action="#" className="inline-form">
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            placeholder="QTY"
                                            min={1}
                                            value={count}
                                            onChange={(e: any) => setCount(e.target.value)}
                                            className="form-control"
                                        />
                                        <span className="input-group-btn">
                      <button
                          type="button"
                          className="btn btn-color"
                          onClick={addToCard}
                      >
                        Add to Cart
                        <i className="ti-bag" />
                      </button>
                    </span>
                                    </div>
                                </form>
                            </div>
                            <div className="single-product-list">
                                <ul>
                                    <li>
                                        <span>Category:</span>
                                        <a href="#">
                                            {
                                                findCategory(parseInt(product?.categoryId ?? "-1", 10))
                                                    ?.name
                                            }
                                        </a>
                                    </li>
                                    <li>
                                        <span>Tags:</span>
                                        <a href="#">
                                            {" "}
                                            {findTag(parseInt(product?.tagId ?? "-1", 10))?.name}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-tabs">
                    <ul role="tablist" className="nav nav-tabs">
                        <li role="presentation" className="active">
                            <a href="#first-tab" role="tab" data-toggle="tab">
                                Description
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#second-tab" role="tab" data-toggle="tab">
                                Sizes
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#third-tab" role="tab" data-toggle="tab">
                                Reviews (3)
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div id="first-tab" role="tabpanel" className="tab-pane active">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Dolorum hic doloribus dolore explicabo, a voluptate optio culpa,
                                aut nulla voluptatem sit nam sed molestias adipisci! Eius nulla
                                beatae, quidem quae. Praesentium eveniet ullam quos accusamus,
                                ea nemo cupiditate. Nemo harum sit, necessitatibus voluptates,
                                sapiente dolorum minima, placeat explicabo consequuntur at neque
                                deserunt.
                            </p>
                            <p>
                                Quidem illum, enim aut, minus nesciunt, distinctio inventore
                                sunt autem numquam eveniet non asperiores unde! Corrupti modi
                                minima doloremque, illum aperiam nemo.
                            </p>
                        </div>
                        <div id="second-tab" role="tabpanel" className="tab-pane">
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th className="upper">Size</th>
                                    <th className="upper">Bust (CM)</th>
                                    <th className="upper">Waist (CM)</th>
                                    <th className="upper">Hips (CM)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>XS</td>
                                    <td>78</td>
                                    <td>60</td>
                                    <td>83</td>
                                </tr>
                                <tr>
                                    <td>S</td>
                                    <td>80</td>
                                    <td>62</td>
                                    <td>86</td>
                                </tr>
                                <tr>
                                    <td>M</td>
                                    <td>88</td>
                                    <td>65</td>
                                    <td>88</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="third-tab" role="tabpanel" className="tab-pane">
                            <div id="comments">
                                <ul className="comments-list">
                                    <li className="rating">
                                        <h5 className="upper">
                                            Jesse Pinkman -{" "}
                                            <span className="rating-stars">
                        <i className="ti-star full" />
                        <i className="ti-star full" />
                        <i className="ti-star full" />
                        <i className="ti-star full" />
                        <i className="ti-star" />
                      </span>
                                        </h5>
                                        <span className="comment-date">
                      Posted on 29 September at 10:41
                    </span>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Explicabo voluptatem quo sit. Sint fugit quidem totam
                                            similique suscipit animi veniam reiciendis, unde facere
                                            quia, optio, at ad possimus perferendis asperiores.
                                        </p>
                                    </li>
                                    <li className="rating">
                                        <h5 className="upper">
                                            Rust Cohle -{" "}
                                            <span className="rating-stars">
                        <i className="ti-star full" />
                        <i className="ti-star full" />
                        <i className="ti-star full" />
                        <i className="ti-star full" />
                        <i className="ti-star" />
                      </span>
                                        </h5>
                                        <span className="comment-date">
                      Posted on 29 September at 10:41
                    </span>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Quasi aspernatur vero dolorum asperiores ratione obcaecati
                                            atque quidem aliquid dicta illo, quod, similique suscipit
                                            maiores, aperiam expedita cum. Ut fugiat, dolores.
                                        </p>
                                    </li>
                                    <li className="rating">
                                        <h5 className="upper">
                                            Arya Stark -{" "}
                                            <span className="rating-stars">
                        <i className="ti-star full" />
                        <i className="ti-star full" />
                        <i className="ti-star full" />
                        <i className="ti-star full" />
                        <i className="ti-star full" />
                      </span>
                                        </h5>
                                        <span className="comment-date">
                      Posted on 29 September at 10:41
                    </span>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Quasi aspernatur vero dolorum asperiores ratione obcaecati
                                            atque quidem aliquid dicta illo, quod, similique suscipit
                                            maiores, aperiam expedita cum. Ut fugiat, dolores.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div id="respond">
                                <h5 className="upper">Leave a rating</h5>
                                <div className="comment-respond">
                                    <form className="comment-form">
                                        <div className="form-double">
                                            <div className="form-group">
                                                <input
                                                    name="author"
                                                    type="text"
                                                    placeholder="Name"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group last">
                                                <input
                                                    name="email"
                                                    type="text"
                                                    placeholder="Email"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-select">
                                                <select className="form-control">
                                                    <option value="">Chose a rating</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                      <textarea
                          placeholder="Comment"
                          className="form-control"
                      />
                                        </div>
                                        <div className="form-submit text-right">
                                            <button type="button" className="btn btn-color-out">
                                                Post Comment
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="related-products">
                    <h5 className="upper">Related Products</h5>
                    <div className="row">
                        {relatedProducts?.map((product: Product) => {
                            return (
                                <div className="col-md-3 col-sm-6">
                                    <div className="shop-product">
                                        <div className="product-thumb">
                                            <Link to={`/shop/${product.id}`}>
                                                <img src={product?.photo} alt="" />
                                            </Link>
                                        </div>
                                        <div className="product-info">
                                            <h4 className="upper">
                                                <a href="#">{product?.name}</a>
                                            </h4>
                                            <span>{product?.sale_price}</span>
                                            <div className="save-product">
                                                <a href="#">
                                                    <i className="icon-heart" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default ProductSingle;
