import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { MoneyValue } from "../../../Constains/Constains";
import { usePayStore } from "../../../mobx/PayStore";
import { Product } from "../../../Models/Product";

interface ShopProps {
    products: Array<Product>;
}

const Shop = observer(({ products }: ShopProps) => {
    const { add } = usePayStore();

    const addToCard = useCallback(
        (product: Product) => {
            add(product);
        },
        [add]
    );

    return (
        <section
            className="App"
            style={{ justifyContent: "center", alignItems: "center" }}
        >
            <div
                className="container"
                style={{
                    padding: 10,
                    zIndex: 10,
                    borderRadius: 10,
                    backgroundColor: "rgba(255,255, 255, 1)",
                }}
            >
                <div className="row">
                    <div className="col-md-3 hidden-sm hidden-xs">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="shop-menu" />
                        <div className="container-fluid">
                            <div className="row">
                                {products.map((product: Product) => (
                                    <div className="col-md-4 col-sm-6">
                                        <div className="shop-product">
                                            <div className="product-thumb">
                                                <Link to={`/shop/${product.id}`}>
                                                    <img
                                                        style={{
                                                            height: "250px",
                                                            width: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                        src={product.photo}
                                                        alt=""
                                                    />
                                                </Link>
                                                <div className="product-overlay">
                                                    <a
                                                        href="#"
                                                        className="btn btn-color-out btn-sm"
                                                        onClick={() => addToCard(product)}
                                                    >
                                                        Add To Cart
                                                        <i className="ti-bag" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="product-info">
                                                <h4 className="upper">
                                                    <a href="#">{product.name}</a>
                                                </h4>
                                                {product.sale_price ?
                                                    <>
                            <span
                                style={{
                                    textDecoration: "line-through",
                                    marginRight: "10px",
                                }}
                            >
                              {product.regular_price + MoneyValue.DOLLAR}
                            </span>

                                                        <span style={{ color: "red" }}>
                              {product.sale_price + MoneyValue.DOLLAR}
                            </span>
                                                    </>
                                                    :
                                                    <span style={{ color: "red" }}>
                            {product.regular_price + MoneyValue.DOLLAR}
                          </span>
                                                }

                                                <div className="save-product">
                                                    <a href="#">
                                                        <i className="icon-heart" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <ul className="pagination">
                                <li>
                                    <a href="#" aria-label="Previous">
                    <span aria-hidden="true">
                      <i className="ti-arrow-left" />
                    </span>
                                    </a>
                                </li>
                                <li className="active">
                                    <a href="#">1</a>
                                </li>
                                <li>
                                    <a href="#">2</a>
                                </li>
                                <li>
                                    <a href="#">3</a>
                                </li>
                                <li>
                                    <a href="#">4</a>
                                </li>
                                <li>
                                    <a href="#">5</a>
                                </li>
                                <li>
                                    <a href="#" aria-label="Next">
                    <span aria-hidden="true">
                      <i className="ti-arrow-right" />
                    </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Shop;
