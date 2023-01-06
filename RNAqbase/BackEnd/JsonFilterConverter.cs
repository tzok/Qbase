using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RNAqbase.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.BackEnd
{
    public class JsonFilterConverter : JsonCreationConverter<Filter>
    {
        protected override Filter Create(Type objectType, JObject jObject)
        {
            switch (jObject["attrID"].ToString())
            {
                case "pdbID":
                    return new PDBIDFilter();
                case "authorName":
                    return new AuthorFilter();
                case "pdbDeposition":
                    return new PDBDepositionFilter();
                case "keyword":
                    return new KeywordFilter();
                case "expMethod":
                    return new ExperimentalMethodFilter();
                case "molType":
                    return new MoleculeTypeFilter();
                case "seqOfTetrads":
                    return new SequenceOfTetradsFilter();
                case "seqOfQuad":
                    return new SequenceOfQuadruplexFilter();
                case "ions":
                    return new DummyFilter();
                case "typeNoStrands":
                    return new TypeFilter();
                case "noOfTetrads":
                    return new NoTetradsFilter();
                case "Ions":
                    return new IonsFilter();
                case "gtractSeq":
                    return new DummyFilter();
                case "loopLen":
                    return new LoopLengthFilter();
                case "bulges":
                    return new BulgesFilter();
                case "vLoops":
                    return new V_LoopsFilter();
                case "webbaDaSilva":
                    return new WebbaDaSilvaFilter();
                case "onzClass":
                    return new ONZFilter();
                default:
                    return new DummyFilter();
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
        }
    }

    public abstract class JsonCreationConverter<T> : JsonConverter
    {
        protected abstract T Create(Type objectType, JObject jObject);

        public override bool CanConvert(Type objectType)
        {
            return typeof(T).IsAssignableFrom(objectType);
        }
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JObject jObject = JObject.Load(reader);
            T target = Create(objectType, jObject);
            serializer.Populate(jObject.CreateReader(), target);
            return target;
        }
    }
}
