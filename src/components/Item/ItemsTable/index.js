import { Table } from "antd";
import React, { useState } from "react";

const ItemsTable = ({ collection, items }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  let additionalFieldsKeys = [];

  if (Object.keys(collection).length) {
    additionalFieldsKeys = [...Object.keys(collection.additionalFields)];
  }

  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "collectionName",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => tags.join(", "),
    },
    {
      title: "Create date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (num) =>
        num
          ? new Date(num).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "",
    },
  ];
  additionalFieldsKeys.forEach((key) => {
    const fieldType = collection["additionalFields"][key]["type"];
    columns.push({
      title: key,
      dataIndex: `additionalFields.${key}.value`,
      key: key,
      render: (_, record) => {
        let value = record.additionalFields[key]?.value;

        if (fieldType === "boolean") return value ? "Yes" : "No";

        if (fieldType === "date") {
          return new Date(value).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        }
        return value;
      },
    });
  });

  const paginationConfig = {
    pageSize: pageSize,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50", "100"],
    total: items.length,
    showTotal: (total, range) =>
      `${range[0]}-${range[1]} из ${total} элементов`,
    onShowSizeChange: (current, size) => {
      setPageSize(size);
    },

  };

  return (
    <Table columns={columns} dataSource={items} pagination={paginationConfig} />
  );
};

export default ItemsTable;
