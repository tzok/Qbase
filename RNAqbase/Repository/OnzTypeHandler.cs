using System;
using System.Data;
using Dapper;
using RNAqbase.Enums;

namespace RNAqbase.Repository
{
	public class OnzTypeHandler : SqlMapper.TypeHandler<Onz>
	{
		public override void SetValue(IDbDataParameter parameter, Onz value)
		{
			throw new NotImplementedException();
		}

		public override Onz Parse(object value)
		{

			switch (value.ToString())
			{
				case "+O":
					return Onz.PlusO;
				case "-O":
					return Onz.MinusO;
				case "+N":
					return Onz.PlusN;
				case "-N":
					return Onz.MinusN;
				case "+Z":
					return Onz.PlusZ;
				case "-Z":
					return Onz.MinusZ;
			}

			return Onz.Op;
		}
	}
}
