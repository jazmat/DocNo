import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
    return (
        <div className="mb-6 text-sm text-gray-600">

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <span key={index}>
                        {!isLast ? (
                            <>
                                <Link
                                    to={item.path}
                                    className="hover:text-blue-600 hover:underline"
                                >
                                    {item.label}
                                </Link>
                                <span className="mx-2">/</span>
                            </>
                        ) : (
                            <span className="font-semibold text-gray-900">
                                {item.label}
                            </span>
                        )}
                    </span>
                );
            })}

        </div>
    );
};

export default Breadcrumb;