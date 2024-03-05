import { DataTable } from "@/components/data-table/DataTable2";
import { InputField } from "@/components/field/InputField";
import { FlexColumn, FlexGrid, FlexRow } from "@/components/flex-grid/FlexGrid";
import { getUUID } from "@/utils/strings";
import * as React from "react";
import styled from "styled-components";
import { User } from "./UserTable";
import { INPUT_FIELD_TYPES } from "@/components/field/Field";
import { Button, Variant } from "@/components/button/Button";
import { ICON, useIcon } from "@/components/icon/useIcon";
import { space } from "@/utils/space";

interface UserCreatorProps {}

const StyledUserCreator = styled(FlexGrid)``;

export const UserCreator: React.FC<UserCreatorProps> = ({}) => {
  const { i } = useIcon();
  const userId = getUUID();
  const [users, setNewUsers] = React.useState<Record<string, User>>({
    [userId]: {
      id: userId,
      name: "",
      email: "",
      createdDate: new Date().getTime()
    },
  });

  const handleAddUser = React.useCallback(() => {
    setNewUsers((prevState) => {
      const newUserId = getUUID();
      const createdDate = new Date().getTime()
      const newState = {
        ...prevState,
        [newUserId]: { id: newUserId, name: "", email: "", createdDate },
      };

      return newState;
    });
  }, []);

  const handleRemoveUser = React.useCallback((userId: string) => {
    setNewUsers((prevState) => {
      delete prevState[userId];
      return {
        ...prevState,
      };
    });
  }, []);

  const handleChange = React.useCallback(
    (userId: string, key: string, value: string) => {
      setNewUsers((prevState) => {
        if (!prevState[userId]) {
          return prevState;
        }
        return {
          ...prevState,
          [userId]: {
            ...prevState[userId],
            [key]: value,
          },
        };
      });
    },
    []
  );

  const actions = React.useCallback(
    (user: User) => {
      const actions = [];
      const keys = Object.keys(users);

      if (user.id !== keys[0] || keys.length > 1) {
        actions.push({
          name: "remove",
          label: "Remove",
          onClick: () => handleRemoveUser(user.id),
          icon: ICON.REMOVE_USER,
          variant: "danger",
        });
      }

      if (user.id === keys[keys.length - 1]) {
        actions.push({
          name: "add",
          label: "Add",
          onClick: handleAddUser,
          icon: ICON.ADD_USER,
        });
      }

      return (
        <FlexGrid gap={space(0.25)}>
          {actions.map((action) => {
            return (
              <FlexColumn grow={0} key={action.name}>
                <Button
                  onClick={action.onClick}
                  title={action.label}
                  isCircle={true}
                  isSquare={true}
                  variant={action.variant as Variant}
                >
                  {i(action.icon)}
                </Button>
              </FlexColumn>
            );
          })}
        </FlexGrid>
      );
    },
    [handleAddUser, handleRemoveUser, i, users]
  );
  const columns = React.useMemo(() => {
    const columns = [
      {
        name: "name",
        label: "Name",
        sortable: false,
        template: (user: unknown) => {
          const u = user as User;

          const onChange = (key: string, value: string) => {
            handleChange(u.id, key, value);
          };
          return (
            <InputField
              type={INPUT_FIELD_TYPES.TEXT}
              name="name"
              label="Name"
              value={u.name}
              onChange={onChange}
            />
          );
        },
      },
      {
        name: "email",
        label: "Email",
        sortable: false,
        template: (user: unknown) => {
          const u = user as User;

          const onChange = (key: string, value: string) => {
            handleChange(u.id, key, value);
          };
          return (
            <InputField
              type={INPUT_FIELD_TYPES.EMAIL}
              name="email"
              label="Email"
              value={u.email}
              onChange={onChange}
            />
          );
        },
      },
      {
        name: "actions",
        label: "",
        sortable: false,
        template: (user: unknown) => {
          const u = user as User;
          return actions(u);
        },
      },
    ];

    return columns;
  }, [actions, handleChange]);

  const rows = React.useMemo(() => {
    const rows = Object.keys(users).map((k) => {
      const user = users[k];
      return {
        id: user.id,
        isFavorite: false,
        values: {
          name: {
            displayValue: user,
            sortValue: user.name,
          },
          email: {
            displayValue: user,
            sortValue: user.email,
          },
          createdDate: {
            displayValue: user,
            sortValue: user.createdDate || 0,
          },
          actions: {
            displayValue: user,
            sortValue: 0,
          },
        },
      };
    });

    return rows;
  }, [users]);

  return (
    <StyledUserCreator direction="column">
      <FlexRow>
        <DataTable
          showFooter={false}
          showColumnControls={false}
          showFilterControls={false}
          rows={rows}
          columns={columns}
          tableId="newUsers"
          label={{ singular: "New User", plural: "New Users" }}
          defaultSort={{
            columnName: "createdDate",
            direction: "asc",
          }}
        />
      </FlexRow>
    </StyledUserCreator>
  );
};
