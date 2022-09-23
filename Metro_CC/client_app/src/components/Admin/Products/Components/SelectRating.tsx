import { Form } from "react-bootstrap";
import React, { useCallback, useState } from "react";

interface SelectTagProps {
  onChange: (rating: string) => void;
}

const Rating = [0, 1, 2, 3, 4, 5];

export const SelectRating = ({ onChange }: SelectTagProps) => {
  const [selectRating, setSelectRating] = useState<number>(-1);

  const onChangeValue = useCallback(
    (event: any) => {
      setSelectRating(parseInt(event.target.value, 10));
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <Form.Group>
      <Form.Label> Rating </Form.Label>
      <select
        className="form-control"
        value={selectRating}
        // onChange={(e) => setInputs({ ...inputs, categoryId: e.target.value })}
        onChange={onChangeValue}
      >
        <option value="">-select-</option>
        {Rating.map((data) => (
          <option value={data}>{data}</option>
        ))}
      </select>
    </Form.Group>
  );
};
