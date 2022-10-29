export enum TableContent {
  authorName = "{\"attribute\":\"Author Name\",\"isOperator\":true,\"conditions\":[{\"condition\":\"Kokosza\",\"operator\":\"!=\"},{\"condition\":\"Kremis\",\"operator\":\"=\"},{\"condition\":\"Matecki\",\"operator\":\"=\"},{\"condition\":\"Lukasiewicz\",\"operator\":\"=\"}],\"row-type\":\"addable\"}",
  pdbID = "{\"attribute\":\"PDB ID\",\"isOperator\":false,\"conditions\":[{\"condition\":\"1234\",\"operator\":\"\"},{\"condition\":\"4321\",\"operator\":\"\"}],\"row-type\":\"addable\"}",
  keyword = "{\"attribute\":\"Keyword\",\"isOperator\":false,\"conditions\":[{\"condition\":\"Hooman\",\"operator\":\"\"}],\"row-type\":\"addable\"}",
  expMethod = "{\"attribute\":\"Experimental Method\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"X-Ray\",\"operator\":\"\"},{\"condition\":\"NMR\",\"operator\":\"\"}],\"row-type\":\"multiSelect\"}",
  molType = "{\"attribute\":\"Molecule Type\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"DNA\",\"operator\":\"\"},{\"condition\":\"RNA\",\"operator\":\"\"},{\"condition\":\"other\",\"operator\":\"\"}],\"row-type\":\"multiSelect\"}",
  typeNoStrands = "{\"attribute\":\"Type (by no. of strands)\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"unimolecular\",\"operator\":\"\"},{\"condition\":\"bimolecular\",\"operator\":\"\"},{\"condition\":\"tetramolecular\",\"operator\":\"\"}],\"row-type\":\"multiSelect\"}",
  handedness = "{\"attribute\":\"Handedness\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"right\",\"operator\":\"\"},{\"condition\":\"left\",\"operator\":\"\"}],\"row-type\":\"radioSelect\"}",
  noOfTetrads = "{\"attribute\":\"Number of tetrads\",\"isOperator\":true,\"conditions\":[{\"condition\":\"3\",\"operator\":\">\"},{\"condition\":\"2\",\"operator\":\"<\"},{\"condition\":\"10\",\"operator\":\">=\"}],\"row-type\":\"addable\"}",
  ions = "{\"attribute\":\"Ions\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"Na\",\"operator\":\"\"},{\"condition\":\"K\",\"operator\":\"\"},{\"condition\":\"Pt\",\"operator\":\"\"},{\"condition\":\"Tl\",\"operator\":\"\"}],\"row-type\":\"multiSelect\"}",
  webbaDaSilva = "{ \"attribute\": \"Webba da Silva\", \"isOperator\": false, \"conditions\": [{ \"condition\": \"any\", \"operator\": \"\" }, { \"condition\": \"web topology\", \"operator\": \"\" }, { \"condition\": \"tetrad comination\", \"operator\": \"\" }], \"row-type\": \"radioSelect\" }",
  onzClass = "{\"attribute\":\"ONZ class\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"N-\",\"operator\":\"\"},{\"condition\":\"Z-\",\"operator\":\"\"},{\"condition\":\"O-\",\"operator\":\"\"}],\"row-type\":\"multiSelect\"}",
  pdbDeposition = "{\"attribute\":\"PDB Deposition\",\"isOperator\":true,\"conditions\":[{\"condition\":\"2010-03-21\",\"operator\":\"<\"},{\"condition\":\"2001-01-01\",\"operator\":\">=\"}],\"row-type\":\"addable\"}",
  gtractSeq = "{\"attribute\":\"G-tract sequence\",\"isOperator\":false,\"conditions\":[{\"condition\":\"GGGG\",\"operator\":\"\"},{\"condition\":\"G\",\"operator\":\"\"}],\"row-type\":\"addable\"}",
  bulges = "{\"attribute\":\"Bulges\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"with bulges\",\"operator\":\"\"},{\"condition\":\"without bulges\",\"operator\":\"\"}],\"row-type\":\"radioSelect\"}",
  vLoops = "{\"attribute\":\"V-Loops\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"with V-Loops\",\"operator\":\"\"},{\"condition\":\"without V-Loops\",\"operator\":\"\"}],\"row-type\":\"radioSelect\"}",
  sequence = "{\"attribute\":\"Sequence\",\"isOperator\":true,\"conditions\":[{\"condition\":\"GCGGGGGGGGG\",\"operator\":\"includes\"},{\"condition\":\"G\",\"operator\":\"3'->5'\"}],\"row-type\":\"addable\"}"
}
