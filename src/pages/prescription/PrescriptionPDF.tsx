import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { 
    padding: 40, 
    backgroundColor: '#FFFFFF', 
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  header: { 
    borderBottomWidth: 2, 
    borderBottomColor: '#0891b2', 
    paddingBottom: 10, 
    marginBottom: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#0891b2',
    letterSpacing: -1
  },
  section: { 
    marginBottom: 15 
  },
  label: { 
    fontSize: 9, 
    color: '#64748b', 
    textTransform: 'uppercase', 
    marginBottom: 3,
    fontWeight: 'bold'
  },
  boldText: { 
    fontWeight: 'bold', 
    fontSize: 14,
    color: '#1e293b'
  },
  table: { 
    width: 'auto', 
    marginTop: 10,
    borderBottomWidth: 1, 
    borderBottomColor: '#e2e8f0' 
  },
  tableRow: { 
    flexDirection: 'row', 
    borderTopWidth: 1, 
    borderTopColor: '#e2e8f0', 
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center'
  },
  col1: { width: '50%' },
  col2: { width: '30%', textAlign: 'center' },
  col3: { width: '20%', textAlign: 'right' },
  footer: { 
    position: 'absolute', 
    bottom: 30, 
    left: 40, 
    right: 40, 
    borderTopWidth: 1, 
    borderTopColor: '#f1f5f9',
    paddingTop: 10, 
    fontSize: 9, 
    color: '#94a3b8', 
    textAlign: 'center' 
  },
  noteBox: {
    backgroundColor: '#f8fafc', 
    padding: 12, 
    borderRadius: 4,
    marginTop: 5
  }
});

export const PrescriptionPDF = ({ data }: { data: any }) => {

  const formattedDate = data?.prescribed_date 
    ? new Date(data.prescribed_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : "N/A";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Rx Prescription</Text>
            <Text style={{ fontSize: 10, color: '#64748b' }}>Date: {formattedDate}</Text>
          </View>
          <View style={{ textAlign: 'right' }}>
            <Text style={styles.boldText}>Dr. {data?.doctor?.user?.name || "Doctor"}</Text>
            <Text style={{ fontSize: 10, color: '#64748b' }}>{data?.doctor?.qualification}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Patient Details</Text>
          <Text style={styles.boldText}>{data?.patient?.user?.name} ({data?.patient?.gender})</Text>
          <Text style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>
            Blood Group: {data?.patient?.blood_group} | Weight: {data?.patient?.weight}kg | Height: {data?.patient?.height}cm
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Diagnosis</Text>
          <View style={styles.noteBox}>
            <Text style={{ fontSize: 11, fontStyle: 'italic', color: '#334155' }}>
              {data?.medical_record?.diagnosis || "No diagnosis provided."}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Prescribed Medicines</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, { backgroundColor: '#f1f5f9', borderTopWidth: 0 }]}>
              <Text style={[styles.col1, styles.label, { marginBottom: 0 }]}>Medicine Name</Text>
              <Text style={[styles.col2, styles.label, { marginBottom: 0 }]}>Frequency (M-A-N)</Text>
              <Text style={[styles.col3, styles.label, { marginBottom: 0 }]}>Duration</Text>
            </View>
            
            {data?.medicines?.map((med: any, i: number) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.col1}>
                  <Text style={{ fontWeight: 'bold', fontSize: 11 }}>{med.medicine_name}</Text>
                  <Text style={{ fontSize: 9, color: '#64748b' }}>Dosage: {med.dosage}</Text>
                </View>
                <Text style={[styles.col2, { fontSize: 11 }]}>{med.frequency}</Text>
                <Text style={[styles.col3, { fontSize: 11 }]}>{med.duration_days} Days</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Special Instructions</Text>
          <View style={[styles.noteBox, { borderLeftWidth: 3, borderLeftColor: '#0891b2' }]}>
            <Text style={{ fontSize: 11, lineHeight: 1.5 }}>{data?.notes}</Text>
          </View>
        </View>

        {data?.medical_record?.notes && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Clinical Remarks</Text>
            <Text style={{ fontSize: 10, color: '#64748b' }}>{data.medical_record.notes}</Text>
          </View>
        )}

        <Text style={styles.footer}>
          This is a digitally generated prescription by Dr. {data?.doctor?.user?.name}. 
          No physical signature required.
        </Text>
      </Page>
    </Document>
  );
};