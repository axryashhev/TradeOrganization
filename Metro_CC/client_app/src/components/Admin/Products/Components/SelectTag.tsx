import { Form } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { toJS } from "mobx";
import {Tag} from "../../../../Models/Tag";

interface SelectTagProps {
  tags: Array<Tag>;
  onChange: (newValue: Tag) => void;
}

export function SelectTag({ tags, onChange }: SelectTagProps) {
  const [selectTag] = useState<Tag | undefined>(undefined);

  const onChangeValue = useCallback(
    (event: any) => {
      const find = toJS(
        tags.find((tag) => tag.id === parseInt(event.target.value, 10))
      );
      if (find) {
        onChange(find);
      }
    },
    [onChange, tags]
  );

  return (
    <Form.Group>
      <Form.Label> Tags </Form.Label>
      <select
        className="form-control"
        value={selectTag?.name}
        // onChange={(e) => setInputs({ ...inputs, categoryId: e.target.value })}
        onChange={onChangeValue}
      >
        <option value="">-select-</option>
        {tags.map((data) => (
          <option key={String(data.id)} value={data.id}>
            {data.name}
          </option>
        ))}
      </select>
    </Form.Group>
  );
}
