import DashboardContentWrapper from "../DashboardContentWrapper";
import { database } from "../../config/firebase";
import { onValue, ref } from "firebase/database";

function CustomerList() {
  onValue(ref(database, "customers"), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });

  return (
    <>
      <DashboardContentWrapper
        title="Daftar Pelanggan"
        button={{ name: "Tambah", path: "new" }}
      >
        <h1>Customer List</h1>
      </DashboardContentWrapper>
    </>
  );
}

export default CustomerList;
