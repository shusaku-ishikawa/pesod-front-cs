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
  image: string;
}

interface IAnswer{
  id?: string;
  customer: ICustomer;
  question: IQuestion;
  prescript: IPrescript;
  descriptive_answer: string | null;
  answer_options: IAnswerOption[];
  hair_record: IHairRecord | null;
  hair_image?: string;
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
  phone_number: string;
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
  connection?: WebSocket;
  unread_flag?: boolean;
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
  is_on_sale: boolean;
  categories: string;
  price: number;
  maker: string;
  tax_rate: number;
  drug_class: string;
  quantity: number;
  usage: string;
  dose: string;
  using_period: string;
  is_doctor_recommend: boolean;
  is_sales: boolean;
}
interface IDelivery{
  [key: string]: any;
  receiver: string;
  prefecture: string;
  city: string;
  street: string;
  building: string;
  address: string;
  zip_code: string;
  phone_number: string;
  deliv_time: number;
}
interface IDeliveryValidator{
  [key: string]: any;
  receiver: Array<Function>;
  prefecture: Array<Function>;
  city: Array<Function>;
  street: Array<Function>;
  building: Array<Function>;
  address: Array<Function>;
  zip_code: Array<Function>;
  phone_number: Array<Function>;
  deliv_time: Array<Function>;  
}

interface ISubscriptionProduct{
  product: string;
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
  pay_method: number;
  product_ids: ISubscriptionProduct[];
  next_delivery_date?: string;
  subsc_status?: string; 
}

interface IOrder{
  id?: string;
  order_status: number;
  customer: ICustomer;
  purchase_times: number;
  total_amount: number;
  order_date: string;
}
interface INotification{
  level: number;
  message: string;
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
  IDeliveryValidator,
  ISubscription,
  IOrder,
  INotification
}