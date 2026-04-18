import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#FFFFFF', fontSize: 10, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderBottomColor: '#0891b2', paddingBottom: 20, marginBottom: 20 },
  companyTitle: { fontSize: 20, fontWeight: 'bold', color: '#0891b2' },
  invoiceTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'right', color: '#1e293b' },
  section: { marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  label: { color: '#64748b', textTransform: 'uppercase', fontSize: 8, fontWeight: 'bold' },
  value: { color: '#1e293b', fontWeight: 'bold' },
  
  // Table Styles
  table: { marginTop: 15 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f8fafc', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', padding: 8, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', padding: 8, alignItems: 'center' },
  colDesc: { width: '40%' },
  colQty: { width: '20%', textAlign: 'center' },
  colPrice: { width: '20%', textAlign: 'right' },
  colTotal: { width: '20%', textAlign: 'right' },

  // Summary & QR Side-by-Side
  bottomSection: { marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' },
  qrContainer: { width: '40%', alignItems: 'center', justifyContent: 'center' },
  qrImage: { width: 80, height: 80 },
  summarySection: { width: '50%' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  netAmount: { fontSize: 14, fontWeight: 'bold', color: '#0891b2', borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 8, marginTop: 4 },
  
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 10, textAlign: 'center', color: '#94a3b8', fontSize: 8 }
});

// TypeScript Interface for Props
interface BillPDFProps {
  data: any;
  qrCode?: string; // QR code base64 string
}

export const BillPDF = ({ data, qrCode }: BillPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.companyTitle}>MEDICAL PORTAL</Text>
          <Text style={{ color: '#64748b' }}>Digital Healthcare Services</Text>
        </View>
        <View>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={{ textAlign: 'right' }}>#{data?.bill_number}</Text>
          <Text style={{ textAlign: 'right' }}>Date: {data?.bill_date}</Text>
        </View>
      </View>

      {/* Patient Info */}
      <View style={styles.section}>
        <Text style={styles.label}>Billed To:</Text>
        <Text style={[styles.value, { fontSize: 12 }]}>{data?.patient?.user?.name}</Text>
        <Text style={{ color: '#64748b' }}>{data?.patient?.user?.email}</Text>
        <Text style={{ color: '#64748b' }}>Blood Group: {data?.patient?.blood_group}</Text>
      </View>

      {/* Status Badge */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ 
          backgroundColor: data?.status === 'PENDING' ? '#fef3c7' : '#dcfce7', 
          color: data?.status === 'PENDING' ? '#92400e' : '#166534', 
          padding: 4, 
          width: 60, 
          textAlign: 'center', 
          fontSize: 8, 
          borderRadius: 4, 
          fontWeight: 'bold' 
        }}>
          {data?.status}
        </Text>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>Description</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colPrice}>Unit Price</Text>
          <Text style={styles.colTotal}>Total</Text>
        </View>

        {data?.items?.map((item: any, idx: number) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.colDesc}>{item.item_type}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colPrice}>₹{item.unit_price}</Text>
            <Text style={styles.colTotal}>₹{item.amount}</Text>
          </View>
        ))}
      </View>

      {/* Bottom Section: QR and Totals */}
      <View style={styles.bottomSection}>
        {/* QR Section (Left) */}
        <View style={styles.qrContainer}>
          {qrCode && <Image src={qrCode} style={styles.qrImage} />}
          <Text style={{ fontSize: 7, color: '#94a3b8', marginTop: 4 }}>Scan to Pay/Verify</Text>
        </View>

        {/* Totals Summary (Right) */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={{ color: '#64748b' }}>Subtotal:</Text>
            <Text style={styles.value}>₹{data?.total_amount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{ color: '#ef4444' }}>Discount:</Text>
            <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>- ₹{data?.discount_amount}</Text>
          </View>
          <View style={[styles.summaryRow, styles.netAmount]}>
            <Text>Net Amount:</Text>
            <Text>₹{data?.net_amount}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.footer}>
        This is a system generated invoice. For any queries, please contact support@medicalportal.com
      </Text>
    </Page>
  </Document>
);