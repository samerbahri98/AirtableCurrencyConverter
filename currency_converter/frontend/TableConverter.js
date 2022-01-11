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
  ViewPicker,
} from "@airtable/blocks/ui";

const TableConverter = (props) => {
  const [table, setTable] = useState(null);
  const [view, setView] = useState(null);
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
      <FormField label="View" padding={2}>
        <ViewPicker table={table} onChange={(newView) => setView(newView)} />
      </FormField>
    );
  if (view)
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
            override(table, view, props.base, props.desired, fieldFrom, fieldTo);
          }}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};

const override = async (table, view, base, desired, fieldFrom, fieldTo) => {
  const queryResult = view.selectRecords();
  await queryResult.loadDataAsync();
  const records = queryResult.recordIds;
  records.forEach(async (id) => {
    const record = queryResult.getRecordByIdIfExists(id);
    const ogAmount = record
      .getCellValueAsString(fieldFrom)
      .substr(1)
      .replace(/,/g, "");
    const recordUpdate = (amount) => update(amount, table, record, fieldTo);
    refresh.amount(
      base,
      desired,
      ogAmount,
      (x) => {
        return;
      },
      recordUpdate
    );
  });
};

const update = async (amount, table, record, field) => {
  const updatedField = {};
  updatedField[field.name] = amount;
  await table.updateRecordAsync(record, updatedField);
};

export default TableConverter;
