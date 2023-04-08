import ContentWrapper from "../dashboard/ContentWrapper";

function OrderList() {
  return (
    <>
      <ContentWrapper
        title="Daftar Pesanan"
        button={[
          {
            name: "Edit",
            path: "edit",
            colorScheme: "gray",
            variant: "outline",
          },
          {
            name: "Tambah Baru",
            path: "new",
            colorScheme: "green",
          },
        ]}
      >
        deez
      </ContentWrapper>
    </>
  );
}

export default OrderList;
