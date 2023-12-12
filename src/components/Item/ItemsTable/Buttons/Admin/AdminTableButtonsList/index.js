import DeleteAdminButton from "../DeleteButton";
import BlockButton from "../BlockButtons";

const AdminTableButtonsList = ({
  isChecked,
  onSetIsChecked,
  onSetUsers,
  onSetError,
}) => {
  return (
    <div>
      <DeleteAdminButton
        isChecked={isChecked}
        onSetIsChecked={onSetIsChecked}
        onSetUsers={onSetUsers}
        onSetError={onSetError}
      />
      <BlockButton
        isChecked={isChecked}
        onSetIsChecked={onSetIsChecked}
        onSetUsers={onSetUsers}
        onSetError={onSetError}
      />
    </div>
  );
};

export default AdminTableButtonsList;
