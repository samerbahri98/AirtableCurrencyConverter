import React, { useState } from "react";
import { refresh } from "./logic";
import {
  TablePicker,
  FieldPicker,
  FormField,
  Select,
  Button,
  ConfirmationDialog,
  useBase,
  useLoadable,
  useRecords,
} from "@airtable/blocks/ui";

const TableConverter = (props) => {
  const [table, setTable] = useState(null);
  const [fieldFrom, setFieldFrom] = useState(null);
  const [fieldTo, setFieldTo] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const stack = [];
  stack.push(
    <FormField label="Table" padding={2}>
      <TablePicker table={table} onChange={(newTable) => setTable(newTable)} />
    </FormField>
  );
  if (table)
    stack.push(
      <FormField label="From Field" padding={2}>
        <FieldPicker
          table={table}
          field={fieldFrom}
          onChange={(newField) => setFieldFrom(newField)}
        />
      </FormField>
    );
  if (fieldFrom)
    stack.push(
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
        <FormField label="Update Field" padding={2}>
          <FieldPicker
            table={table}
            field={fieldTo}
            onChange={(newField) => setFieldTo(newField)}
          />
        </FormField>
      </>
    );
  if (fieldTo)
    stack.push(
      <FormField label="" padding={2}>
        <Button onClick={() => setIsDialogOpen(true)} icon="edit">
          Update
        </Button>
      </FormField>
    );

  return (
    <>
      {stack}
      {isDialogOpen && (
        <ConfirmationDialog
          isConfirmActionDangerous={true}
          title="Are you sure?"
          body="This action can’t be undone."
          onConfirm={() => {
            setIsDialogOpen(false);
            override(table, fieldFrom, fieldTo);
          }}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};

const override = async (table, fieldFrom, fieldTo) => {
  const base = useBase();

  const queryResult = table.selectRecords();
  useLoadable(queryResult);
  const records = useRecords(table);
  records.forEach(async (id) => {
    const record = queryResult.getRecordByIdIfExists(id);
    const ogAmount = record.getCellValueAsString(fieldFrom);
    const recordUpdate = (amount) => update(amount, table,record, fieldTo);
    refresh.amount(
      props.base,
      props.desired,
      ogAmount,
      (x) => {
        return;
      },
      recordUpdate
    );
  });
};

const update = async (amount, table, record, field) => {

};

export default TableConverter;
