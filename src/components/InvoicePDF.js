// components/InvoicePDF.js
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  header: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12 },
  tableRow: { flexDirection: 'row', borderBottom: 1, paddingBottom: 4, marginBottom: 4 },
  tableCol: { width: '25%' },
});

const InvoicePDF = ({ order }) => (
  <Document>
    <Page size={{ width: 595.28, height: 420 }} style={styles.page}>
      <Text style={styles.header}>Order Invoice</Text>

      <View style={styles.section}>
        <Text style={styles.text}>Order ID: {order._id}</Text>
        <Text style={styles.text}>Customer: {order.userId?.name} ({order.userId?.email})</Text>
        <Text style={styles.text}>Shipping Address: {order.shippingAddress}</Text>
        <Text style={styles.text}>Payment Method: {order.paymentMethod}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Products</Text>
        {order.items.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.text, styles.tableCol]}>{item.productId?.name}</Text>
            <Text style={[styles.text, styles.tableCol]}>₹{item.productId?.price}</Text>
            <Text style={[styles.text, styles.tableCol]}>Qty: {item.quantity}</Text>
            <Text style={[styles.text, styles.tableCol]}>
              ₹{item.productId?.price * item.quantity}
            </Text>
          </View>
        ))}
      </View>

      <Text style={{ marginTop: 20, fontSize: 14 }}>
        Grand Total: ₹{order.totalAmount}
      </Text>
    </Page>
  </Document>
);

export default InvoicePDF;
