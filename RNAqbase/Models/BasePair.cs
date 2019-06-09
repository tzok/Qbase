using RNAqbase.Enums;

namespace RNAqbase.Models
{
	public class BasePair : BaseEntity
	{
		public int Id { get; set; }
		public Nucleotide Nucleotide1 { get; set; }
		public Nucleotide Nucleotide2 { get; set; }
		public Stericity Stericity { get; set; }
		public Edge Edge5 { get; set; }
		public Edge Edge3 { get; set; }
	}
}
