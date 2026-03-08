
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    COALESCE(
      CASE 
        WHEN NEW.raw_user_meta_data->>'user_type' IN ('student','teacher','guardian','institution','ministry','doctor','entrepreneur','developer','skills','cybersecurity')
        THEN (NEW.raw_user_meta_data->>'user_type')::app_role
        ELSE 'student'::app_role
      END,
      'student'::app_role
    )
  );
  RETURN NEW;
END;
$function$;
