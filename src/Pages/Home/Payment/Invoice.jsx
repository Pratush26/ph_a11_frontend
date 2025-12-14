import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { styles } from "./style";
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { useLocation } from "react-router";

const InvoicePDF = ({ dataArr }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
          <Text>Invoice #INV-2024-001</Text>
        </View>
        <View style={styles.spaceY}>
          <Text style={styles.textBold}>Infracare</Text>
          <Text>2324/34 D Block, Mirpur,</Text>
          <Text>Dhaka, Bangladesh</Text>
        </View>
      </View>

      <View style={styles.spaceY}>
        <Text style={[styles.billTo, styles.textBold]}>Bill To:</Text>
        <Text>InfraCare Authority,</Text>
        <Text>Dhaka, Bangladesh</Text>
      </View>

      {/* Render the table */}
      <Table style={styles.table}>
        <TH style={[styles.tableHeader, styles.textBold]}>
          <TD style={styles.td}>TransactionId</TD>
          <TD style={styles.td}>Date</TD>
          <TD style={styles.td}>Paid By</TD>
          <TD style={styles.td}>Total</TD>
        </TH>
        {dataArr.map((item, index) => (
          <TR key={index}>
            <TD style={styles.td}>{item.transactionId}</TD>
            <TD style={styles.td}>{item.date}</TD>
            <TD style={styles.td}>{item.paidBy}</TD>
            <TD style={styles.td}>{item.total.toFixed(2)}</TD>
          </TR>
        ))}
      </Table>

      <View style={styles.totals}>
        <View
          style={{
            minWidth: "256px",
          }}
        >
          {dataArr.map((item) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: "8px",
              }}
            >
              <Text style={styles.textBold}>Total</Text>
              <Text style={styles.textBold}>{item.total}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);
export default function PaymentInvoice() {
  const { state } = useLocation()
  console.log(state)
  return (
    <div className="w-full mx-auto my-10">
      <div className="my-4 flex justify-center">
        <PDFDownloadLink document={<InvoicePDF dataArr={state ?? []} />} fileName="invoice.pdf">
          <button className="btn btn-primary trns rounded-full">
            Download PDF
          </button>
        </PDFDownloadLink>
      </div>
      <div className="w-full h-screen">
        <PDFViewer width="100%" height="100%">
          <InvoicePDF dataArr={state ?? []} />
        </PDFViewer>
      </div>
    </div>
  );
}