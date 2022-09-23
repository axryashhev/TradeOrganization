import React, { useCallback, useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {Category} from "../../../Models/Category";
interface AddCategoryComponentProps {
  addForm: boolean;
  lenghtCategories: number;
  addCategory: (cat: Category) => void;
}

export const AddCategoryComponent = ({
  addForm,
  lenghtCategories,
  addCategory,
}: AddCategoryComponentProps) => {
  console.log("lebghr: ", lenghtCategories);
  const [categoryName, setCategoryName] = useState<string>("");

  const onChange = useCallback((event: any) => {
    setCategoryName(event.target.value);
  }, []);

  const handleCatFormSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      console.log("category: ", {
        id: lenghtCategories,
        name: categoryName,
      });

      addCategory({
        id: lenghtCategories,
        name: categoryName,
      });

      // const slug = makeSlug(cat.name);

      // axios
      //   .post("http://localhost:5050/Categories", {
      //     id: "",
      //     name: cat.name,
      //     // slug,
      //   })
      //   .then((res) => {
      //     setAddForm(false);
      //     setCat({
      //       name: "",
      //       id: "",
      //     });
      //   });
    },
    [addCategory, categoryName, lenghtCategories]
  );

  return useMemo(
    () =>
      addForm ? (
        <>
          <h2>Add new Category</h2>
          <hr />
          <Form onSubmit={handleCatFormSubmit}>
            <Form.Group>
              <Form.Control
                type="tex"
                value={categoryName}
                onChange={onChange}
                placeholder="Tag Name"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Button type="submit" className="btn btn-sm btn-success">
                Add
              </Button>
            </Form.Group>
          </Form>
        </>
      ) : null,
    [addForm, categoryName, handleCatFormSubmit, onChange]
  );
};
