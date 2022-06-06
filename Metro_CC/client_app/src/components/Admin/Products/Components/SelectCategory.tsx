import { Form } from "react-bootstrap";
import React, { useCallback, useState } from "react";
import { toJS } from "mobx";
import { Category } from "../../../../Interfaces/Interfaces";

interface SelectTagProps {
  categories: Array<Category>;
  onChange: (newValue: Category) => void;
}

export function SelectCategory({ categories, onChange }: SelectTagProps) {
  const [selectCategory] = useState<Category | undefined>(undefined);

  const onChangeValue = useCallback(
    (event: any) => {
      const find = toJS(
        categories.find(
          (category) => category.id === parseInt(event.target.value, 10)
        )
      );
      if (find) {
        onChange(find);
      }
    },
    [onChange, categories]
  );

  return (
    <Form.Group>
      <Form.Label> Category </Form.Label>
      <select
        className="form-control"
        value={selectCategory?.name}
        // onChange={(e) => setInputs({ ...inputs, categoryId: e.target.value })}
        onChange={onChangeValue}
      >
        <option value="">-select-</option>
        {categories.map((data) => (
          <option key={String(data.id)} value={data.id}>
            {data.name}
          </option>
        ))}
      </select>
    </Form.Group>
  );
}
