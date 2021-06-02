import React from "react";
import { FormField, Select, Input } from "@airtable/blocks/ui";

const LocalConverter = (props) => {
  return (
    <>
      <FormField label="Amount" padding={2}>
        <Input
          id="amountTop"
          value={props.amountTop}
          onChange={(e) => props.update.top(e.target.value)}
        />
      </FormField>

      <FormField label="From" padding={2}>
        <Select
          id="base"
          options={props.currencies}
          value={props.base}
          onChange={(value) => props.update.from(value)}
          size="large"
        />
      </FormField>
      <FormField label="To" padding={2}>
        <Select
          id="desired"
          options={props.currencies}
          value={props.desired}
          onChange={(value) => props.update.to(value)}
          size="large"
        />
      </FormField>

      <FormField label="Amount" padding={2}>
        <Input
          id="amountBottom"
          value={props.amountBottom}
          onChange={(e) => props.update.bottom(e.target.value)}
        />
      </FormField>
    </>
  );
};

export default LocalConverter;
