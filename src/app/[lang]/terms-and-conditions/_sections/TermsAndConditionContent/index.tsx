import Link from 'next/link';

export default function TermsAndConditionContent() {
  return (
    <div className='flex flex-col gap-5 font-primary px-5 text-base text-primary-titleTextColor my-7'>
      <p>
        This Privacy Policy governs the manner in which PropertyGuru.ae, owned
        and managed by Bright Minds Hub Marketing Management LLC, collects,
        uses, maintains and discloses information collected from users (each, a
        “User”) of the{' '}
        <span>
          <Link
            href='https://propertyguru.ae'
            className='font-semibold'
            target='_blank'
            rel='noopener noreferrer'>
            https://propertyguru.ae
          </Link>
        </span>{' '}
        website (“Site”). This privacy policy applies to the Site and all
        products and services offered by Property Guru.
      </p>
      <p className='text-base  font-bold font-secondary text-primary-contactUsTextColor '>
        Personal identification information
      </p>
      <p>
        {' '}
        We may collect personal identification information from Users in a
        variety of ways in connection with activities, services, features or
        resources we make available on our Site. Users may visit our Site
        anonymously. We will collect personal identification information from
        Users only if they voluntarily submit such information to us. Users can
        always refuse to supply personally identification information, except
        that it may prevent them from engaging in certain Site related
        activities
      </p>
      <p className='text-base  font-bold font-secondary text-primary-contactUsTextColor '>
        Non-personal identification information
      </p>
      <p>
        We may collect non-personal identification information about Users
        whenever they interact with our Site. Non-personal identification
        information may include the browser name, the type of computer and
        technical information about Users means of connection to our Site, such
        as the operating system and the Internet service providers utilized and
        other similar information.
      </p>
      <p className='text-base  font-bold font-secondary text-primary-contactUsTextColor '>
        Web browser cookies
      </p>
      <p>
        Our Site may use “cookies” to enhance User experience. User’s web
        browser places cookies on their hard drive for record-keeping purposes
        and sometimes to track information about them. User may choose to set
        their web browser to refuse cookies, or to alert you when cookies are
        being sent. If they do so, note that some parts of the Site may not
        function properly.
      </p>
      <p className='text-base  font-bold font-secondary text-primary-contactUsTextColor '>
        How we protect your information
      </p>
      <p>
        We adopt appropriate data collection, storage and processing practices
        and security measures to protect against unauthorized access,
        alteration, disclosure or destruction of your personal information,
        username, password, transaction information and data stored on our Site.
      </p>
      <p className='text-base  font-bold font-secondary text-primary-contactUsTextColor '>
        Sharing your personal information
      </p>
      <p>
        We do not sell, trade, or rent Users personal identification information
        to others. We may share generic aggregated demographic information not
        linked to any personal identification information regarding visitors and
        users with our business partners, trusted affiliates and advertisers for
        the purposes outlined above.
      </p>
      <p className='text-base  font-bold font-secondary text-primary-contactUsTextColor '>
        Changes to this privacy policy
      </p>
      <p>
        PropertyGuru.ae has the discretion to update this privacy policy at any
        time. When we do, we will revise the updated date at the bottom of this
        page. We encourage Users to frequently check this page for any changes
        to stay informed about how we are helping to protect the personal
        information we collect. You acknowledge and agree that it is your
        responsibility to review this privacy policy periodically and become
        aware of modifications.
      </p>
      <p className='text-base  font-bold font-secondary text-primary-contactUsTextColor '>
        Your acceptance of these terms
      </p>
      <p>
        By using this Site, you signify your acceptance of this policy. If you
        do not agree to this policy, please do not use our Site. Your continued
        use of the Site following the posting of changes to this policy will be
        deemed your acceptance of those changes
      </p>
    </div>
  );
}
