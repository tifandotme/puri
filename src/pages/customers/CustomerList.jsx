import DashboardContentWrapper from "../DashboardContentWrapper";

function CustomerList() {
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
