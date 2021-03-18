interface ILogin{
  email: string;
  password: string;
}

interface IToken{
  access: string;
  refresh: string;
}

interface ISignup{
  email: string;
  password: string;
  password2: string;
}
interface IQuestion{
  id: string;
  priority: number;
  title: string;
  question_body: string;
  question_types: string;
  keyName: string;
  qa_options: IOption[];
  answer?: string;
}
interface IOption{
 id: string;
 priority: number;
 option: string; 
}

interface IHairRecord{
  id?: number;
  shooting_part: number;
  shooting_date: string;
  image: File;
}

interface IAnswer{
  id?: string;
  customer: ICustomer;
  question: IQuestion;
  prescript: IPrescript;
  descriptive_answer: string | null;
  answer_options: IAnswerOption[];
  hair_record: Blob | string | null;
  hair_image?: string
}
interface IAnswerOption{
  id?: number;
  answer: string;
  option: string;
}

interface ICustomer{
  uuid: string;
  id?: number;
  first_name: string;
  last_name: string;
  zip_code: string;
  prefecture: string;
  city: string;
  address: string;
  
}
interface IChatLog{
  id?: number;
  room_type: string;
  prescript: number;
  owner: number;
  speaker: number;
  message: string;
}
interface IMessageTemplate{
  template_type: string;
  message: string;
}
interface IChatMessage{
  uuid: string;
  message: string;  
}

interface IDoctor{
  id?: number;
  address: string | null;
  city: string | null;
  clinic_name: string | null;
  description: string | null;
  examination_fee: number;
  first_kana: string | null;
  first_name: string | null;
  last_kana: string | null;
  last_name: string | null;
  phone_number: string | null;
  prefecture: string | null;
  zip_code: string | null;
  image: string | null;
}

interface ILog{
  id: number;
  date: string;
  imgFront: string;
  imgTop: string;
  sunshine: boolean;
  alchol: boolean;
  cigar: boolean;
  exercise: boolean;
}
interface IPrescript{
  id: string;
  customer: ICustomer;
  prescript_no: string;
  prescript_date: string;
  prescription_use_period: null;
  prescript_products?: IProduct[];
  status: number;  
}

interface IRegistration{
  first_name: string;
  last_name: string;
  first_kana: string;
  last_kana: string;
  phone_number: string;
  birthday: string;
  gender: number;
  prefecture: string;
  city: string;
  street: string;
  building: string;
  zip_code: string;
  password: string;
  address?: string;
}

interface IProduct{
  id?: string;
  name: string;
  image: string;
  categories: Array<string>;
  is_on_sale: boolean;
  price: number;
  maker: string;
  tax_rate: number;
  quantity: number;
  usage: string;
  dose: string;
  using_period: string;
  is_doctor_recommend: boolean;
  is_sales: boolean;
}
interface IDelivery{
  prefecture: string;
  city: string;
  street: string;
  building: string;
  address: string;
  zip_code: string;
}
interface ISubscriptionProduct{
  id: string;
  item_count: number;
}

interface ISubscription{
  policy_accepted?: boolean; 
  delivery_interval: number;
  deliv_time: number;
  zip_code: string;
  prefecture: string;
  city: string;
  address: string;
  phone_number: string;
  deliv_method: string;
  pay_method: string;
  product_ids: ISubscriptionProduct[];
}
export {
  IToken,
  IDoctor,
  ILogin,
  ISignup,
  IQuestion,
  IOption,
  IAnswer,
  IAnswerOption,
  ICustomer,
  IChatLog,
  IChatMessage,
  ILog,
  IPrescript,
  IHairRecord,
  IMessageTemplate,
  IRegistration,
  IProduct,
  IDelivery,
  ISubscription
}