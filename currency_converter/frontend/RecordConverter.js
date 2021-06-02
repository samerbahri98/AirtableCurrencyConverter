import React, { useState } from "react";
import {
  useBase,
  FormField,
  Select,
  Input,
  useLoadable,
  useWatchable,
} from "@airtable/blocks/ui";
import { cursor } from "@airtable/blocks";

const RecordConverter = (props) => {
  useLoadable(cursor);
  useWatchable(cursor, ["selectedRecordIds", "selectedFieldIds"]);

  const base = useBase();
  const table = base.getTableByIdIfExists(cursor.activeTableId);
  const queryResult = table.selectRecords();
  useLoadable(queryResult);

  //if (currentCell(cursor, base))props.update.top(currentCell(cursor, base));

  if (cursor.selectedRecordIds[0])
    props.update.top(
      queryResult
        .getRecordByIdIfExists(cursor.selectedRecordIds[0])
        .getCellValue(cursor.selectedFieldIds[0])
    );

  return (
    <>
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
          onChange={(e) => {
            props.update.bottom(e.target.value);
          }}
        />
      </FormField>
    </>
  );
};

export default RecordConverter;
